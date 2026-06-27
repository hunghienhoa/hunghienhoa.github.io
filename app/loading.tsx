export default function Loading() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9ff_0%,#eef2ff_45%,#f8fafc_100%)] px-4 py-6 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_42%,#030712_100%)]">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-20 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="h-80 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
            <div className="h-64 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
          </div>
          <div className="space-y-4">
            <div className="h-56 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
            <div className="h-72 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
