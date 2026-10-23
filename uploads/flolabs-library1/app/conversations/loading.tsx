export default function LoadingConversations() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="h-8 w-48 rounded-full bg-border" />
      <div className="mt-4 h-5 w-80 max-w-full rounded-full bg-border" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.85fr)]">
        <div>
          <div className="aspect-video rounded-3xl bg-border" />
          <div className="mt-5 h-8 w-2/3 rounded-full bg-border" />
          <div className="mt-3 h-4 w-1/2 rounded-full bg-border" />
          <div className="mt-8 h-24 rounded-2xl bg-border" />
        </div>
        <div className="h-80 rounded-3xl bg-border" />
      </div>
    </div>
  );
}
