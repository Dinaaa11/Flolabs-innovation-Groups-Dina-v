import Link from 'next/link';

export default function ConversationNotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 pb-24 pt-36 text-center">
      <h1 className="text-2xl font-semibold">This conversation is not available.</h1>
      <Link href="/conversations" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
        Back to conversations
      </Link>
    </div>
  );
}
