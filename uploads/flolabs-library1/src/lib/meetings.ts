type StrapiBlock = {
  type?: string;
  children?: { text?: string; type?: string }[];
};

type StrapiMeeting = {
  id: number;
  documentId: string;
  meeting_date?: string | null;
  meeting_title?: string | null;
  meeting_link?: string | null;
  meeting_summary?: StrapiBlock[] | null;
  meeting_transcription?: StrapiBlock[] | null;
  publishedAt?: string | null;
};

export type TranscriptCue = {
  startLabel: string;
  startSeconds: number;
  speaker: string;
  text: string;
};

export type MeetingListItem = {
  id: string;
  title: string;
  date: string;
  videoUrl: string;
  youtubeId: string;
  summary: string;
  highlights: string[];
  chapters: { time: string; seconds: number; title: string }[];
  durationLabel: string;
};

export type MeetingDetail = MeetingListItem & {
  cues: TranscriptCue[];
  speakers: string[];
};

function blockLines(blocks: StrapiBlock[] | null | undefined): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map((block) => (block.children || []).map((child) => child.text || '').join('').trim())
    .filter(Boolean);
}

function toSeconds(stamp: string): number {
  const parts = stamp.split(':').map((part) => Number(part));
  if (parts.some((part) => Number.isNaN(part))) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + Math.floor(parts[2]);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] || 0;
}

export function formatClock(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remain = seconds % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(remain).padStart(2, '0')}`;
  return `${minutes}:${String(remain).padStart(2, '0')}`;
}

function youtubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match?.[1] || '';
}

function parseSummary(blocks: StrapiBlock[] | null | undefined) {
  const lines = blockLines(blocks);
  const chapterIndex = lines.findIndex((line) => line.toUpperCase() === 'CHAPTERS');
  const body = chapterIndex === -1 ? lines : lines.slice(0, chapterIndex);
  const highlightIndex = body.findIndex((line) => /highlights?:?$/i.test(line));
  const highlightLines = highlightIndex === -1 ? [] : body.slice(highlightIndex + 1);
  const highlights: string[] = [];
  for (const line of highlightLines) {
    if (line.length > 160) break;
    highlights.push(line.replace(/^\*\s*/, '').replace(/\*$/, ''));
  }
  const summary = body.join('\n\n');
  const chapters = (chapterIndex === -1 ? [] : lines.slice(chapterIndex + 1))
    .map((line) => {
      const match = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/);
      if (!match) return null;
      return { time: match[1], seconds: toSeconds(match[1]), title: match[2] };
    })
    .filter((chapter): chapter is { time: string; seconds: number; title: string } => Boolean(chapter));
  return { summary, highlights, chapters };
}

function parseTranscript(blocks: StrapiBlock[] | null | undefined): TranscriptCue[] {
  const lines = blockLines(blocks);
  const cues: TranscriptCue[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const time = line.match(/^(\d{2}:\d{2}:\d{2}\.\d+)\s+-->\s+(\d{2}:\d{2}:\d{2}\.\d+)/);
    if (!time) continue;
    const spoken = lines[index + 1] || '';
    if (!spoken || /^\d+$/.test(spoken) || spoken.startsWith('00:')) continue;
    const speakerSplit = spoken.match(/^([^:]{2,60}):\s+([\s\S]+)$/);
    cues.push({
      startLabel: time[1].split('.')[0],
      startSeconds: toSeconds(time[1]),
      speaker: speakerSplit ? speakerSplit[1].trim() : '',
      text: speakerSplit ? speakerSplit[2].trim() : spoken,
    });
  }
  return cues;
}

function mapListItem(row: StrapiMeeting): MeetingListItem {
  const videoUrl = row.meeting_link || '';
  const parsed = parseSummary(row.meeting_summary);
  const lastChapter = parsed.chapters[parsed.chapters.length - 1];
  return {
    id: row.documentId,
    title: (row.meeting_title || 'Untitled meeting').trim(),
    date: row.meeting_date || '',
    videoUrl,
    youtubeId: youtubeId(videoUrl),
    summary: parsed.summary,
    highlights: parsed.highlights,
    chapters: parsed.chapters,
    durationLabel: lastChapter ? formatClock(lastChapter.seconds) : '',
  };
}

async function strapiGet(path: string): Promise<{ data?: StrapiMeeting[] }> {
  const base = process.env.STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;
  if (!base || !token) {
    throw new Error('STRAPI_URL and STRAPI_API_TOKEN are required');
  }
  const response = await fetch(`${base.replace(/\/$/, '')}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status})`);
  }
  return response.json();
}

export async function getMeetings(): Promise<MeetingListItem[]> {
  const payload = await strapiGet(
    '/api/sunday-tech-meetings?fields[0]=meeting_title&fields[1]=meeting_date&fields[2]=meeting_link&fields[3]=meeting_summary&pagination[pageSize]=100&sort=publishedAt:desc'
  );
  return (payload.data || []).map(mapListItem);
}

export async function getMeeting(id: string): Promise<MeetingDetail | null> {
  const payload = await strapiGet(
    `/api/sunday-tech-meetings?filters[documentId][$eq]=${encodeURIComponent(id)}`
  );
  const row = payload.data?.[0];
  if (!row) return null;
  const cues = parseTranscript(row.meeting_transcription);
  const speakers = [...new Set(cues.map((cue) => cue.speaker).filter(Boolean))];
  const lastCue = cues[cues.length - 1];
  const item = mapListItem(row);
  return {
    ...item,
    durationLabel: lastCue ? formatClock(lastCue.startSeconds) : item.durationLabel,
    cues,
    speakers,
  };
}
