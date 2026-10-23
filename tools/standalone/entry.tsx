import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../../uploads/flolabs-library1/src/App';
import { AboutExperience } from '../../uploads/flolabs-library1/src/components/AboutExperience';
import { InternationalAbout } from '../../uploads/flolabs-library1/src/components/InternationalAbout';
import { MeetingsShell } from '../../uploads/flolabs-library1/src/components/MeetingsShell';
import { usePathname } from './next-shim';

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
  if (path.startsWith('/conversations')) {
    return (
      <MeetingsShell activeNav="meetings">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
          <h1 className="text-3xl font-semibold">Conversations</h1>
          <p className="mt-3 text-muted">
            Meeting records stay on the live site. This file does not include them.
          </p>
          <a className="mt-6 inline-flex text-primary underline" href="http://localhost:3000/conversations">
            Open conversations
          </a>
        </div>
      </MeetingsShell>
    );
  }
  return <App />;
}

createRoot(document.getElementById('root')!).render(<Standalone />);
