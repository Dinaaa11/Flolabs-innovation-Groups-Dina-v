import { notFound } from 'next/navigation';
import { getMeeting, getMeetings } from '../../../src/lib/meetings';
import { MeetingsExperience } from '../../../src/components/MeetingsExperience';
import { MeetingsShell } from '../../../src/components/MeetingsShell';

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [meetings, selected] = await Promise.all([getMeetings(), getMeeting(id)]);
  if (!selected) notFound();
  return (
    <MeetingsShell>
      <MeetingsExperience meetings={meetings} selected={selected} />
    </MeetingsShell>
  );
}
