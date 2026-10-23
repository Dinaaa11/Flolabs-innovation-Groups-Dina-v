import type { Metadata } from 'next';
import { AboutExperience } from '../../src/components/AboutExperience';
import { InternationalAbout } from '../../src/components/InternationalAbout';
import { MeetingsShell } from '../../src/components/MeetingsShell';

export const metadata: Metadata = {
  title: 'Flolabs innovation Group',
  description:
    'Meet John Hazlewood, founder and CEO of FloLabs, a global experiential learning and venture ecosystem for AI, robotics, research and entrepreneurship.',
};

export default function AboutPage() {
  return (
    <MeetingsShell activeNav="about">
      <InternationalAbout part="hero" />
      <InternationalAbout part="intro" />
      <AboutExperience />
      <InternationalAbout part="body" />
    </MeetingsShell>
  );
}
