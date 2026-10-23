import { NextResponse } from 'next/server';
import { getMeeting } from '../../../../src/lib/meetings';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const meeting = await getMeeting(id);
    if (!meeting) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({
      cues: meeting.cues,
      speakers: meeting.speakers,
      durationLabel: meeting.durationLabel,
    });
  } catch {
    return NextResponse.json({ error: 'Unable to load meeting' }, { status: 502 });
  }
}
