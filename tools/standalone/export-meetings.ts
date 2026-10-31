import { config } from 'dotenv';
import { getMeeting, getMeetings } from '../../uploads/flolabs-library1/src/lib/meetings';

const envFile = process.env.FLO_ENV_FILE;
if (envFile) config({ path: envFile, quiet: true });

async function main() {
  const meetings = await getMeetings();
  const details: Record<string, { cues: unknown; speakers: string[]; durationLabel: string }> = {};
  for (const meeting of meetings) {
    const full = await getMeeting(meeting.id);
    if (!full) continue;
    details[meeting.id] = {
      cues: full.cues,
      speakers: full.speakers,
      durationLabel: full.durationLabel,
    };
  }
  process.stdout.write(JSON.stringify({ meetings, details }));
}

main().catch((error: Error) => {
  process.stderr.write(`meeting export failed: ${error.message}\n`);
  process.exit(1);
});
