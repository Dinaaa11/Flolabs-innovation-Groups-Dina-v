'use client';

export default function ConversationsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-6 pb-24 pt-36 text-center">
      <h1 className="text-2xl font-semibold">Unable to load conversations</h1>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
