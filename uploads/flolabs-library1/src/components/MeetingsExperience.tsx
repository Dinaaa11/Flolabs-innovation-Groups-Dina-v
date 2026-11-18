'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { MeetingDetail, MeetingListItem } from '../lib/meetings';

type Props = {
  meetings: MeetingListItem[];
  selected: MeetingDetail;
};

type TabId = 'about' | 'transcript' | 'discussion';

function thumb(id: string) {
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

function IconPlay({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

function IconCalendar({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
    </svg>
  );
}

function IconClock({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.5l3 1.5" />
    </svg>
  );
}

function IconUsers({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16.5" cy="9" r="2.2" />
      <path d="M3.5 18.5c1.2-3 3.4-4.5 5.5-4.5s4.3 1.5 5.5 4.5" />
      <path d="M14 14.2c1.2-.5 2.6-.4 4 .8 1 .9 1.7 2.2 2 3.5" />
    </svg>
  );
}

function IconShare({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.3 10.8l7.4-4.1M8.3 13.2l7.4 4.1" />
    </svg>
  );
}

function IconBookmark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function IconDoc({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
      <path d="M14 3.5V8h4.5M8.5 12h7M8.5 16h5" />
    </svg>
  );
}

function IconChat({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 19 16.5H11l-4 3v-3H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5z" />
    </svg>
  );
}

export function MeetingsExperience({ meetings, selected }: Props) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<TabId>('about');
  const [start, setStart] = useState(0);
  const [transcriptQuery, setTranscriptQuery] = useState('');
  const [shareNote, setShareNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState('');
  const [detail, setDetail] = useState<{ cues: MeetingDetail['cues']; speakers: string[]; durationLabel: string } | null>(null);

  useEffect(() => {
    let cancel = false;
    setDetail(null);
    setStart(0);
    setTab('about');
    setTranscriptQuery('');
    setShareNote('');
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem('flolabs-watch-later') || '[]';
      const ids = JSON.parse(raw) as string[];
      setSaved(ids.includes(selected.id));
    } catch {
      setSaved(false);
    }
  }, [selected.id]);

  const cuesSource = detail?.cues ?? selected.cues;
  const speakers = detail?.speakers ?? selected.speakers;
  const durationLabel = detail?.durationLabel || selected.durationLabel;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return meetings;
    return meetings.filter((meeting) => {
      const haystack = [meeting.title, meeting.date, meeting.summary, ...meeting.highlights]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [meetings, query]);

  const cues = useMemo(() => {
    const needle = transcriptQuery.trim().toLowerCase();
    if (!needle) return cuesSource;
    return cuesSource.filter((cue) =>
      `${cue.speaker} ${cue.text}`.toLowerCase().includes(needle)
    );
  }, [cuesSource, transcriptQuery]);

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
  const related = meetings.filter((meeting) => meeting.id !== selected.id).slice(0, 6);

  async function onShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: selected.title, url });
        setShareNote('Shared');
      } else {
        await navigator.clipboard.writeText(url);
        setShareNote('Link copied');
      }
    } catch {
      setShareNote('');
    }
    window.setTimeout(() => setShareNote(''), 2000);
  }

  function onWatchLater() {
    try {
      const raw = localStorage.getItem('flolabs-watch-later') || '[]';
      const ids = new Set(JSON.parse(raw) as string[]);
      if (ids.has(selected.id)) ids.delete(selected.id);
      else ids.add(selected.id);
      localStorage.setItem('flolabs-watch-later', JSON.stringify([...ids]));
      setSaved(ids.has(selected.id));
    } catch {
      setSaved(false);
    }
  }

  return (
    <div className="bg-[#f6f8fc] text-foreground dark:bg-background dark:text-foreground">
      <style>{`
        .meet-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .meet-card:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(13,20,36,0.08); }
        .meet-thumb img { transition: transform 0.35s ease; }
        .meet-card:hover .meet-thumb img { transform: scale(1.03); }
        .meet-btn { transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease; }
        .meet-btn:hover { transform: translateY(-1px); }
        .meet-btn:active { transform: translateY(1px); }
        .meet-play-item { transition: background-color 0.15s ease, border-color 0.15s ease; }
        .meet-speakers { display: grid; gap: 0.5rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (min-width: 768px) {
          .meet-speakers { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .meet-card, .meet-btn, .meet-thumb img { transition: none !important; transform: none !important; }
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#0d1424] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 70% at 8% 40%, rgba(126,182,255,0.28), transparent 60%), radial-gradient(ellipse 45% 55% at 92% 15%, rgba(126,182,255,0.14), transparent 55%), radial-gradient(ellipse 40% 50% at 70% 90%, rgba(126,182,255,0.08), transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 sm:pb-12 lg:px-8">
          <h1 className="max-w-[16ch] font-['Outfit',sans-serif] text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]">
            Conversations that shape the{' '}
            <span className="text-[#7eb6ff]">work</span>
          </h1>
          <p className="mt-4 max-w-2xl font-['Google_Sans_Flex','Google_Sans',sans-serif] text-base text-[#b9c6dc] sm:text-lg">
            Ideas, perspectives, and recorded meetings from FloLabs teams building across AI, robotics, and research.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.9fr)]">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#d8e0ec] bg-[#0d1424] shadow-[0_24px_60px_rgba(13,20,36,0.18)] dark:border-border">
            <div className="relative">
              {(selected.date || durationLabel) && (
                <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-[#0d1424]/75 px-3 py-1 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-xs font-medium text-white backdrop-blur">
                  {[selected.date, durationLabel].filter(Boolean).join(' · ')}
                </span>
              )}
              {embed && localFile ? (
                <a href={watchUrl} target="_blank" rel="noreferrer" className="relative block">
                  <img src={thumb(selected.youtubeId)} alt="" className="aspect-video w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-[#0d1424]/35">
                    <span className="meet-btn inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg">
                      <IconPlay className="h-7 w-7" />
                    </span>
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
          </div>

          <aside className="flex max-h-[min(70vh,560px)] flex-col overflow-hidden rounded-[1.5rem] border border-[#d8e0ec] bg-white shadow-[0_16px_40px_rgba(13,20,36,0.06)] dark:border-border dark:bg-[#061626]">
            <div className="border-b border-[#e6ecf4] px-4 py-4 dark:border-border sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-['Outfit',sans-serif] text-lg font-medium tracking-[-0.02em]">Playlist</h2>
                <span className="rounded-full bg-[#0d1424]/06 px-2.5 py-1 text-xs font-semibold text-[#0d1424] dark:bg-white/10 dark:text-white">
                  {visible.length}
                </span>
              </div>
              <label className="mt-3 block">
                <span className="sr-only">Search playlist</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search meetings..."
                  className="w-full rounded-full border border-[#d8e0ec] bg-[#f6f8fc] px-4 py-2.5 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-sm outline-none ring-[#7eb6ff]/40 placeholder:text-muted focus:ring-2 dark:border-border dark:bg-[#0d1424]"
                />
              </label>
            </div>
            {visible.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted sm:px-5">No conversations match this search. Try another title or topic.</p>
            ) : (
              <ol className="flex-1 space-y-1 overflow-y-auto p-2">
                {visible.map((meeting) => {
                  const active = meeting.id === selected.id;
                  return (
                    <li key={meeting.id}>
                      <Link
                        href={`/conversations/${meeting.id}`}
                        className={`meet-play-item flex gap-3 rounded-2xl border px-2.5 py-2.5 ${
                          active
                            ? 'border-[#7eb6ff]/45 bg-[#7eb6ff]/15 dark:bg-[#7eb6ff]/20'
                            : 'border-transparent hover:bg-[#f0f4fa] dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="meet-thumb relative h-[3.35rem] w-[5.5rem] shrink-0 overflow-hidden rounded-xl bg-[#0d1424]">
                          {meeting.youtubeId ? (
                            <img src={thumb(meeting.youtubeId)} alt="" className="h-full w-full object-cover" />
                          ) : null}
                          {active && (
                            <span className="absolute inset-0 flex items-center justify-center bg-[#0d1424]/35">
                              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                                <IconPlay className="h-3.5 w-3.5" />
                              </span>
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1 py-0.5">
                          <span className={`block text-sm font-semibold leading-snug ${active ? 'text-[#0d1424] dark:text-[#7eb6ff]' : ''}`}>
                            {meeting.title}
                          </span>
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

        <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h2 className="font-['Outfit',sans-serif] text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
              {selected.title}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-sm text-muted">
              {selected.date && (
                <li className="inline-flex items-center gap-2">
                  <IconCalendar />
                  {selected.date}
                </li>
              )}
              {durationLabel && (
                <li className="inline-flex items-center gap-2">
                  <IconClock />
                  {durationLabel}
                </li>
              )}
              {speakers.length > 0 && (
                <li className="inline-flex items-center gap-2">
                  <IconUsers />
                  {speakers.length} speakers
                </li>
              )}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onShare}
              className="meet-btn inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d8e0ec] bg-white px-4 py-2.5 text-sm font-semibold dark:border-border dark:bg-[#061626]"
            >
              <IconShare />
              {shareNote || 'Share'}
            </button>
            <button
              type="button"
              onClick={onWatchLater}
              className={`meet-btn inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ${
                saved
                  ? 'border border-[#7eb6ff] bg-[#7eb6ff]/15 text-[#0d1424] dark:text-[#7eb6ff]'
                  : 'bg-[#0d1424] text-white dark:bg-[#7eb6ff] dark:text-[#0d1424]'
              }`}
            >
              <IconBookmark />
              {saved ? 'Saved' : 'Watch Later'}
            </button>
          </div>
        </div>

        <div className="mt-8 inline-flex flex-wrap gap-1 rounded-2xl border border-[#d8e0ec] bg-white p-1 dark:border-border dark:bg-[#061626]">
          <TabButton active={tab === 'about'} onClick={() => setTab('about')} label="About" icon={<IconDoc />} />
          <TabButton active={tab === 'transcript'} onClick={() => setTab('transcript')} label="Transcript" icon={<IconDoc />} />
          <TabButton active={tab === 'discussion'} onClick={() => setTab('discussion')} label="Discussion" icon={<IconChat />} />
        </div>

        {tab === 'about' && (
          <div className="mt-6 rounded-[1.35rem] border border-[#d8e0ec] bg-white p-5 sm:p-6 dark:border-border dark:bg-[#061626]">
            <h3 className="font-['Outfit',sans-serif] text-lg font-medium tracking-[-0.02em]">About this meeting</h3>
            {selected.summary ? (
              <p className="mt-3 whitespace-pre-line font-['Google_Sans_Flex','Google_Sans',sans-serif] text-sm leading-relaxed text-foreground/85 sm:text-base">
                {selected.summary}
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted">No overview available for this conversation.</p>
            )}
            {selected.highlights.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {selected.highlights.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-[#d8e0ec] bg-[#f6f8fc] px-3 py-1.5 text-sm dark:border-border dark:bg-[#0d1424]"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'transcript' && (
          <div className="mt-6 rounded-[1.35rem] border border-[#d8e0ec] bg-white p-5 sm:p-6 dark:border-border dark:bg-[#061626]">
            <h3 className="font-['Outfit',sans-serif] text-lg font-medium tracking-[-0.02em]">Transcript</h3>
            {cuesSource.length === 0 ? (
              <p className="mt-4 text-muted">
                {detail ? 'Transcript not available for this conversation.' : 'Loading transcript...'}
              </p>
            ) : (
              <>
                <label className="mt-4 block">
                  <span className="sr-only">Search transcript</span>
                  <input
                    value={transcriptQuery}
                    onChange={(event) => setTranscriptQuery(event.target.value)}
                    placeholder="Search transcript..."
                    className="w-full rounded-full border border-[#d8e0ec] bg-[#f6f8fc] px-5 py-3 text-sm outline-none ring-[#7eb6ff]/40 focus:ring-2 dark:border-border dark:bg-[#0d1424]"
                  />
                </label>
                {cues.length === 0 ? (
                  <p className="mt-4 text-sm text-muted">No transcript lines match this search.</p>
                ) : (
                  <ol className="mt-4 max-h-[540px] space-y-1 overflow-y-auto pr-1">
                    {cues.map((cue, index) => (
                      <li key={`${cue.startSeconds}-${index}`}>
                        <button
                          type="button"
                          onClick={() => setStart(cue.startSeconds)}
                          className="grid w-full grid-cols-[4.5rem_minmax(0,1fr)] gap-3 rounded-xl px-2 py-3 text-left transition hover:bg-[#7eb6ff]/10"
                        >
                          <span className="pt-0.5 text-sm font-semibold text-primary">{cue.startLabel}</span>
                          <span>
                            {cue.speaker && <span className="block text-sm font-semibold">{cue.speaker}</span>}
                            <span className="block text-sm leading-relaxed text-foreground/85">{cue.text}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                )}
              </>
            )}
          </div>
        )}

        {tab === 'discussion' && (
          <div className="mt-6 rounded-[1.35rem] border border-[#d8e0ec] bg-white p-5 sm:p-6 dark:border-border dark:bg-[#061626]">
            <h3 className="font-['Outfit',sans-serif] text-lg font-medium tracking-[-0.02em]">Discussion topics</h3>
            {selected.highlights.length === 0 && speakers.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No discussion notes for this conversation yet.</p>
            ) : (
              <div className="mt-4 space-y-6">
                {selected.highlights.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Key topics</p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {selected.highlights.map((topic) => (
                        <li key={topic} className="rounded-2xl border border-[#d8e0ec] px-4 py-3 text-sm dark:border-border">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {speakers.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Speakers</p>
                    <ul className="meet-speakers mt-3">
                      {speakers.map((speaker) => (
                        <li key={speaker} className="rounded-2xl border border-[#d8e0ec] px-4 py-3 text-sm font-medium dark:border-border">
                          {speaker}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {related.length > 0 && (
          <section className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-['Outfit',sans-serif] text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                Related Meetings
              </h2>
              <Link
                href="/conversations"
                className="inline-flex items-center gap-1 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-sm font-semibold text-[#0d1424] dark:text-[#7eb6ff]"
              >
                View all
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((meeting) => (
                <Link
                  key={meeting.id}
                  href={`/conversations/${meeting.id}`}
                  className="meet-card meet-thumb overflow-hidden rounded-[1.25rem] border border-[#d8e0ec] bg-white dark:border-border dark:bg-[#061626]"
                >
                  <div className="relative overflow-hidden">
                    {meeting.youtubeId ? (
                      <img src={thumb(meeting.youtubeId)} alt="" className="aspect-video w-full object-cover" />
                    ) : (
                      <div className="aspect-video bg-[#0d1424]" />
                    )}
                    {meeting.durationLabel && (
                      <span className="absolute right-2 top-2 rounded-md bg-[#0d1424]/80 px-2 py-0.5 text-[11px] font-semibold text-white">
                        {meeting.durationLabel}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                        <IconPlay className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-['Outfit',sans-serif] font-medium leading-snug tracking-[-0.02em]">
                          {meeting.title}
                        </h3>
                        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-xs text-muted">
                          {meeting.date && (
                            <span className="inline-flex items-center gap-1">
                              <IconCalendar className="h-3.5 w-3.5" />
                              {meeting.date}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="relative mt-14 overflow-hidden rounded-[1.5rem] border border-[#7eb6ff]/25 bg-[#7eb6ff]/12 px-5 py-8 sm:px-8 dark:bg-[#7eb6ff]/10">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#7eb6ff]/20"
          />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-['Outfit',sans-serif] text-2xl font-medium tracking-[-0.03em]">Stay connected</h2>
              <p className="mt-2 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-sm text-foreground/80 sm:text-base">
                Get notified when the next FloLabs tech meeting drops.
              </p>
            </div>
            <form
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                setEmail('');
              }}
            >
              <label className="min-w-0 flex-1">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-white/80 bg-white px-4 py-3 text-sm outline-none ring-[#7eb6ff]/40 focus:ring-2 dark:border-border dark:bg-[#061626]"
                />
              </label>
              <button
                type="submit"
                className="meet-btn inline-flex min-h-11 items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

function TabButton({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 font-['Google_Sans_Flex','Google_Sans',sans-serif] text-sm font-semibold transition ${
        active
          ? 'bg-[#7eb6ff]/18 text-[#0d1424] dark:text-[#7eb6ff]'
          : 'text-muted hover:text-foreground'
      }`}
    >
      <span className={active ? 'text-[#0d1424] dark:text-[#7eb6ff]' : ''}>{icon}</span>
      {label}
    </button>
  );
}
