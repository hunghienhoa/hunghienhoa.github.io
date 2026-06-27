export default function AppLoading() {
  return (
    <div className="space-y-6">
      <div className="h-72 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="space-y-6">
          <div className="h-56 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
          <div className="h-72 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
          <div className="h-80 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
        </div>
        <div className="space-y-6">
          <div className="h-80 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
          <div className="h-72 animate-pulse rounded-[2rem] bg-white/70 dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
}
