import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type AppArtworkProps = {
  label: string;
  gradient: [string, string];
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "size-14 rounded-[1.25rem] text-lg",
  md: "size-[4.5rem] rounded-[1.5rem] text-2xl",
  lg: "size-[6.5rem] rounded-[2rem] text-4xl",
} as const;

export function AppArtwork({ label, gradient, size = "md" }: AppArtworkProps) {
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden border border-white/60 font-semibold text-white shadow-[0_20px_50px_-24px_rgba(37,99,235,0.55)]",
        sizeMap[size],
      )}
      style={{ backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(17,24,39,0.22))]" />
      <span className="relative z-10 tracking-[0.12em]">{label}</span>
    </div>
  );
}

export function SectionHeader({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-1">
        {eyebrow ? <p className="text-sm font-medium text-sky-600 dark:text-sky-300">{eyebrow}</p> : null}
        <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function LinkLikeButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-sky-700 transition hover:bg-sky-100 dark:text-sky-200 dark:hover:bg-white/10">
      {children}
      <ChevronRight className="size-4" />
    </span>
  );
}

export function GlassCard({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  children?: ReactNode;
}) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[2rem] border border-white/65 bg-white/88 p-5 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111827]/88 dark:shadow-[0_22px_60px_-30px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TagPill({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition",
        active
          ? "border-sky-500/40 bg-sky-500 text-white"
          : "border-slate-200 bg-white/85 text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300",
      )}
    >
      {children}
    </span>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`star-${index}`}
          className={cn(
            "size-4",
            index < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600",
          )}
        />
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <GlassCard className="flex flex-col items-start gap-3">
      <span className="inline-flex rounded-full bg-sky-100 p-3 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
        <Sparkles className="size-5" />
      </span>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </GlassCard>
  );
}
