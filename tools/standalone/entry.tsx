import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../../uploads/flolabs-library1/src/App';
import { AboutExperience } from '../../uploads/flolabs-library1/src/components/AboutExperience';
import { InternationalAbout } from '../../uploads/flolabs-library1/src/components/InternationalAbout';
import { MeetingsExperience } from '../../uploads/flolabs-library1/src/components/MeetingsExperience';
import { MeetingsShell } from '../../uploads/flolabs-library1/src/components/MeetingsShell';
import type { MeetingDetail, MeetingListItem } from '../../uploads/flolabs-library1/src/lib/meetings';
import { usePathname } from './next-shim';

type Detail = Pick<MeetingDetail, 'cues' | 'speakers' | 'durationLabel'>;

declare global {
  interface Window {
    __FLO_MEETINGS__?: MeetingListItem[];
    __FLO_DETAILS__?: Record<string, Detail>;
  }
}

const originalFetch = window.fetch.bind(window);
window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  const match = url.match(/\/api\/meetings\/([^/?#]+)/);
  const detail = match ? window.__FLO_DETAILS__?.[decodeURIComponent(match[1])] : undefined;
  if (detail) return Promise.resolve(new Response(JSON.stringify(detail), { status: 200, headers: { 'Content-Type': 'application/json' } }));
  return originalFetch(input, init);
};

function Conversations({ path }: { path: string }) {
  const meetings = window.__FLO_MEETINGS__ || [];
  const id = decodeURIComponent(path.split('/')[2] || '');
  const item = meetings.find((meeting) => meeting.id === id) || meetings[0];
  if (!item) {
    return (
      <MeetingsShell activeNav="meetings">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
          <h1 className="text-3xl font-semibold">Conversations</h1>
          <p className="mt-3 text-muted">No conversations available yet.</p>
        </div>
      </MeetingsShell>
    );
  }
  const extra = window.__FLO_DETAILS__?.[item.id];
  const selected: MeetingDetail = {
    ...item,
    cues: extra?.cues || [],
    speakers: extra?.speakers || [],
    durationLabel: extra?.durationLabel || item.durationLabel,
  };
  return (
    <MeetingsShell activeNav="meetings">
      <MeetingsExperience meetings={meetings} selected={selected} />
    </MeetingsShell>
  );
}

function Standalone() {
  const path = usePathname();
  if (path.startsWith('/about')) {
    return (
      <MeetingsShell activeNav="about">
        <InternationalAbout part="hero" />
        <InternationalAbout part="intro" />
        <AboutExperience />
        <InternationalAbout part="body" />
      </MeetingsShell>
    );
  }
  if (path.startsWith('/conversations')) return <Conversations path={path} />;
  return <App />;
}

createRoot(document.getElementById('root')!).render(<Standalone />);
