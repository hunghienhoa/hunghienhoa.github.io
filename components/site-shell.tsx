"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Apple,
  ArrowUpSquare,
  Gamepad2,
  MoonStar,
  PlusCircle,
  Search,
  Share2,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SiteShellProps = {
  title: string;
  children: ReactNode;
  subtitle?: string;
};

const navItems = [
  { href: "/category/games", label: "Trò chơi", icon: Gamepad2 },
  { href: "/category/apps", label: "Ứng dụng", icon: Sparkles },
  { href: "/search", label: "Tìm kiếm", icon: Search },
  { href: "#more", label: "Thêm", icon: PlusCircle },
];

export function SiteShell({ title, subtitle, children }: SiteShellProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("nebula-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme === "dark" || (!storedTheme && prefersDark) ? "dark" : "light";
    setTheme(nextTheme);
    root.classList.toggle("dark", nextTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("nebula-theme", nextTheme);
  };

  const activeSection = useMemo(() => {
    if (pathname.startsWith("/search")) return "/search";
    if (pathname.startsWith("/category/apps")) return "/category/apps";
    return "/category/games";
  }, [pathname]);

  const handleShare = async () => {
    try {
      const shareData = {
        title: "Nebula IPA",
        text: "Khám phá kho IPA với giao diện lấy cảm hứng từ App Store hiện đại.",
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      return;
    }
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.25),_transparent_30%),linear-gradient(180deg,#f7f9ff_0%,#eef2ff_45%,#f8fafc_100%)] pb-28 text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_42%,#030712_100%)] dark:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-40 rounded-[2rem] border border-white/60 bg-white/82 px-4 py-3 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/78">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-[1.4rem] bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] text-white shadow-lg">
                  <span className="text-lg font-semibold tracking-[0.2em]">N</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="truncate text-[1.75rem] font-semibold tracking-[-0.05em]">{title}</h1>
                    <span className="grid size-7 place-items-center rounded-full bg-sky-500/12 text-sky-600 dark:bg-sky-400/12 dark:text-sky-300">
                      <Apple className="size-4" />
                    </span>
                  </div>
                  {subtitle ? <p className="truncate text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void handleShare()}
                className="ripple-button grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                aria-label="Chia sẻ"
              >
                <Share2 className="size-5" />
              </button>
              <button
                type="button"
                className="ripple-button grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                aria-label="Upload"
              >
                <ArrowUpSquare className="size-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="mt-6 flex-1">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(92vw,520px)] rounded-[2rem] border border-white/75 bg-white/85 px-3 py-2 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.4)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isMore = item.href === "#more";
            const isActive = isMore ? isMoreOpen : activeSection === item.href;

            if (isMore) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setIsMoreOpen((currentState) => !currentState)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-[1.35rem] px-2 py-2.5 text-xs font-medium transition",
                    isActive
                      ? "bg-sky-500/12 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300"
                      : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5",
                  )}
                >
                  <Icon className="size-5" />
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-[1.35rem] px-2 py-2.5 text-xs font-medium transition",
                  isActive
                    ? "bg-sky-500/12 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300"
                    : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5",
                )}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <AnimatePresence>
        {isMoreOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-x-4 bottom-28 z-50 mx-auto max-w-md rounded-[2rem] border border-white/75 bg-white/92 p-4 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/88"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">Thiết lập nhanh</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Chuyển theme và mở các khu vực nổi bật.</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="ripple-button inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link
                href="/admin"
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-sky-500/30 hover:bg-sky-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-sky-500/10"
              >
                Admin Dashboard
              </Link>
              <Link
                href="/category/productivity"
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-sky-500/30 hover:bg-sky-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-sky-500/10"
              >
                Productivity
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
