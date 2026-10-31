'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { MeetingDetail, MeetingListItem } from '../lib/meetings';

type Props = {
  meetings: MeetingListItem[];
  selected: MeetingDetail;
};

function thumb(id: string) {
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

export function MeetingsExperience({ meetings, selected }: Props) {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [tab, setTab] = useState<'overview' | 'transcript'>('overview');
  const [start, setStart] = useState(0);
  const [transcriptQuery, setTranscriptQuery] = useState('');
  const [detail, setDetail] = useState<{ cues: MeetingDetail['cues']; speakers: string[]; durationLabel: string } | null>(null);

  useEffect(() => {
    let cancel = false;
    setDetail(null);
    fetch(`/api/meetings/${selected.id}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (!cancel && payload?.cues) setDetail(payload);
      })
      .catch(() => {});
    return () => {
      cancel = true;
    };
  }, [selected.id]);

  const cuesSource = detail?.cues ?? selected.cues;
  const speakers = detail?.speakers ?? selected.speakers;
  const durationLabel = detail?.durationLabel || selected.durationLabel;

  const dates = useMemo(
    () => [...new Set(meetings.map((meeting) => meeting.date).filter(Boolean))],
    [meetings]
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return meetings.filter((meeting) => {
      if (date !== 'all' && meeting.date !== date) return false;
      if (!needle) return true;
      const haystack = [meeting.title, meeting.date, meeting.summary, ...meeting.highlights]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [meetings, query, date]);

  const cues = useMemo(() => {
    const needle = transcriptQuery.trim().toLowerCase();
    if (!needle) return cuesSource;
    return cuesSource.filter((cue) =>
      `${cue.speaker} ${cue.text}`.toLowerCase().includes(needle)
    );
  }, [cuesSource, transcriptQuery]);

  const totalSeconds = meetings.reduce((sum, meeting) => {
    const parts = meeting.durationLabel.split(':').map(Number);
    if (parts.length === 3) return sum + parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return sum + parts[0] * 60 + parts[1];
    return sum;
  }, 0);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  const localFile = typeof window !== 'undefined' && window.location.protocol === 'file:';
  const origin = typeof window !== 'undefined' && window.location.protocol.startsWith('http')
    ? `&origin=${encodeURIComponent(window.location.origin)}`
    : '';
  const embed = selected.youtubeId
    ? `https://www.youtube.com/embed/${selected.youtubeId}?start=${start}&rel=0${origin}`
    : '';
  const watchUrl = selected.youtubeId
    ? `https://www.youtube.com/watch?v=${selected.youtubeId}${start ? `&t=${start}s` : ''}`
    : '';

  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border bg-[#0d1424] text-white">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-28 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7eb6ff]">FloLabs Conversations</p>
          <h1 className="mt-3 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            Conversations
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#b9c6dc] sm:text-lg">
            Ideas, perspectives, and conversations shaping the future of technology.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search meetings</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search meetings, topics, or speakers..."
              className="w-full rounded-full border border-border bg-white dark:bg-[#061626] px-5 py-3 text-sm outline-none ring-primary/30 placeholder:text-muted focus:ring-2"
            />
          </label>
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full border border-border bg-white dark:bg-[#061626] px-5 py-3 text-sm font-semibold"
          >
            Filter
          </button>
        </div>
        {filtersOpen && (
          <div className="mt-3 rounded-2xl border border-border bg-white dark:bg-[#061626] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Date</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <FilterChip active={date === 'all'} onClick={() => setDate('all')} label="All dates" />
              {dates.map((value) => (
                <FilterChip key={value} active={date === value} onClick={() => setDate(value)} label={value} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.85fr)]">
          <div>
            <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              {embed && localFile ? (
                <a href={watchUrl} target="_blank" rel="noreferrer" className="relative block">
                  <img src={thumb(selected.youtubeId)} alt="" className="aspect-video w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full bg-[#ff0000] px-4 py-2 text-sm font-semibold text-white">Watch on YouTube</span>
                  </span>
                </a>
              ) : embed ? (
                <iframe
                  key={`${selected.id}-${start}`}
                  title={selected.title}
                  src={embed}
                  className="aspect-video w-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex aspect-video items-center justify-center text-sm text-white/70">
                  Video not available for this conversation.
                </div>
              )}
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{selected.title}</h2>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
              {selected.date && <span>{selected.date}</span>}
              {durationLabel && <span>{durationLabel}</span>}
            </p>

            <div className="mt-6 flex gap-2 border-b border-border">
              <TabButton active={tab === 'overview'} onClick={() => setTab('overview')} label="Overview" />
              <TabButton active={tab === 'transcript'} onClick={() => setTab('transcript')} label="Transcript" />
            </div>

            {tab === 'overview' ? (
              <div className="py-6">
                {selected.summary ? (
                  <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">{selected.summary}</p>
                ) : (
                  <p className="text-muted">No overview available for this conversation.</p>
                )}
                {selected.highlights.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Key topics</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {selected.highlights.map((topic) => (
                        <li key={topic} className="rounded-full border border-border bg-white dark:bg-[#061626] px-3 py-1.5 text-sm">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {speakers.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Speakers</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {speakers.map((speaker) => (
                        <li key={speaker} className="rounded-2xl border border-border bg-white dark:bg-[#061626] px-4 py-3 text-sm font-medium">
                          {speaker}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6">
                <h3 className="text-lg font-semibold">Transcript</h3>
                {cuesSource.length === 0 ? (
                  <p className="mt-4 text-muted">{detail ? 'Transcript not available for this conversation.' : 'Loading transcript...'}</p>
                ) : (
                  <>
                    <input
                      value={transcriptQuery}
                      onChange={(event) => setTranscriptQuery(event.target.value)}
                      placeholder="Search transcript..."
                      className="mt-4 w-full rounded-full border border-border bg-white dark:bg-[#061626] px-5 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
                    />
                    <ol className="mt-4 max-h-[540px] space-y-4 overflow-y-auto pr-1">
                      {cues.map((cue, index) => (
                        <li key={`${cue.startSeconds}-${index}`} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
                          <button
                            type="button"
                            onClick={() => setStart(cue.startSeconds)}
                            className="pt-0.5 text-left text-sm font-semibold text-primary"
                          >
                            {cue.startLabel}
                          </button>
                          <div>
                            {cue.speaker && <p className="text-sm font-semibold">{cue.speaker}</p>}
                            <p className="text-sm leading-relaxed text-foreground/85">{cue.text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-border bg-white dark:bg-[#061626] p-4 sm:p-5">
            <h2 className="text-lg font-semibold">Series</h2>
            <p className="mt-1 text-sm text-muted">
              {meetings.length} meetings
              {(totalHours > 0 || totalMinutes > 0) && ` · ${totalHours}h ${totalMinutes}m`}
            </p>
            {visible.length === 0 ? (
              <p className="mt-4 text-sm text-muted">No conversations match this search.</p>
            ) : (
              <ol className="mt-4 max-h-[70vh] space-y-1 overflow-y-auto lg:max-h-[640px]">
                {visible.map((meeting, index) => {
                  const active = meeting.id === selected.id;
                  return (
                    <li key={meeting.id}>
                      <Link
                        href={`/conversations/${meeting.id}`}
                        className={`flex gap-3 rounded-2xl px-3 py-3 transition ${active ? 'bg-primary/10' : 'hover:bg-muted/10'}`}
                      >
                        <span className={`w-6 shrink-0 pt-0.5 text-xs font-semibold ${active ? 'text-primary' : 'text-muted'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-sm font-semibold ${active ? 'text-primary' : ''}`}>{meeting.title}</span>
                          <span className="mt-1 block text-xs text-muted">
                            {[meeting.date, meeting.durationLabel].filter(Boolean).join(' · ')}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </aside>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Related conversations</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {meetings
              .filter((meeting) => meeting.id !== selected.id)
              .map((meeting) => (
                <Link
                  key={meeting.id}
                  href={`/conversations/${meeting.id}`}
                  className="overflow-hidden rounded-3xl border border-border bg-white dark:bg-[#061626] transition hover:-translate-y-0.5"
                >
                  {meeting.youtubeId ? (
                    <img src={thumb(meeting.youtubeId)} alt="" className="aspect-video w-full object-cover" />
                  ) : (
                    <div className="aspect-video bg-[#0d1424]" />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold leading-snug">{meeting.title}</h3>
                    <p className="mt-2 text-xs text-muted">
                      {[meeting.date, meeting.durationLabel].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FilterChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm ${active ? 'bg-primary text-white' : 'border border-border'}`}
    >
      {label}
    </button>
  );
}

function TabButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 px-3 py-2 text-sm font-semibold ${active ? 'border-primary text-primary' : 'border-transparent text-muted'}`}
    >
      {label}
    </button>
  );
}
