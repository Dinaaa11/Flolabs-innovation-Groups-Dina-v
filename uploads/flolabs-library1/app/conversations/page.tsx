import { getMeetings } from '../../src/lib/meetings';
import { MeetingsExperience } from '../../src/components/MeetingsExperience';
import { MeetingsShell } from '../../src/components/MeetingsShell';

export default async function ConversationsIndexPage() {
  let meetings: Awaited<ReturnType<typeof getMeetings>> = [];
  try {
    meetings = await getMeetings();
  } catch {
    return (
      <MeetingsShell>
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
          <h1 className="text-3xl font-semibold">Conversations</h1>
          <p className="mt-3 text-muted">Unable to load conversations.</p>
        </div>
      </MeetingsShell>
    );
  }
  if (meetings.length === 0) {
    return (
      <MeetingsShell>
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
          <h1 className="text-3xl font-semibold">Conversations</h1>
          <p className="mt-3 text-muted">No conversations available yet.</p>
        </div>
      </MeetingsShell>
    );
  }
  const first = meetings[0];
  return (
    <MeetingsShell>
      <MeetingsExperience
        meetings={meetings}
        selected={{ ...first, cues: [], speakers: [] }}
      />
    </MeetingsShell>
  );
}
