"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import QRCode from "react-qr-code";
import { Bookmark, Flag, Heart, MessageSquarePlus, Send, Star } from "lucide-react";
import type { Comment, Review } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AppArtwork, GlassCard, Stars } from "@/components/shared";
import { cn } from "@/lib/utils";

type CommentsSectionProps = {
  appName: string;
  appSlug: string;
  gradient: [string, string];
  iconLabel: string;
  initialComments: Comment[];
  initialReviews: Review[];
  initialDownloads: number;
  initialViews: number;
};

type StoredComment = Comment & {
  createdAt: string;
};

export function CommentsSection({
  appName,
  appSlug,
  gradient,
  iconLabel,
  initialComments,
  initialReviews,
  initialDownloads,
  initialViews,
}: CommentsSectionProps) {
  const commentsKey = `nebula-comments:${appSlug}`;
  const favoriteKey = `nebula-favorite:${appSlug}`;
  const bookmarkKey = `nebula-bookmark:${appSlug}`;
  const reviewKey = `nebula-review:${appSlug}`;
  const statsKey = `nebula-stats:${appSlug}`;

  const { ready: commentsReady, storedValue: storedComments, setValue: setStoredComments } = useLocalStorage<StoredComment[]>(
    commentsKey,
    initialComments.map((comment) => ({ ...comment, createdAt: new Date().toISOString() })),
  );
  const { storedValue: isFavorite, setValue: setFavorite } = useLocalStorage<boolean>(favoriteKey, false);
  const { storedValue: isBookmarked, setValue: setBookmark } = useLocalStorage<boolean>(bookmarkKey, false);
  const { storedValue: rating, setValue: setRating } = useLocalStorage<number>(reviewKey, initialReviews[0]?.rating ?? 5);
  const { storedValue: stats, setValue: setStats } = useLocalStorage<{ downloads: number; views: number }>(statsKey, {
    downloads: initialDownloads,
    views: initialViews + 1,
  });
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const reviewsAverage = useMemo(() => {
    const seededAverage = initialReviews.reduce((sum, review) => sum + review.rating, 0) / Math.max(initialReviews.length, 1);
    return ((seededAverage + rating) / 2).toFixed(1);
  }, [initialReviews, rating]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!author.trim() || !content.trim()) {
      return;
    }

    const nextComment: StoredComment = {
      id: `local-${Date.now()}`,
      author: author.trim(),
      content: content.trim(),
      timeAgo: "Vừa xong",
      avatarColor: "from-cyan-400 to-blue-500",
      createdAt: new Date().toISOString(),
    };

    setStoredComments([nextComment, ...storedComments]);
    setAuthor("");
    setContent("");
  };

  const handleDownload = () => {
    setStats((currentStats) => ({
      ...currentStats,
      downloads: currentStats.downloads + 1,
    }));
  };

  const handleReport = () => {
    window.alert("Cảm ơn bạn đã gửi báo cáo. Mục này có thể được nối với API thật ở bản production.");
  };

  return (
    <div className="space-y-6">
      <GlassCard className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <AppArtwork label={iconLabel} gradient={gradient} size="sm" />
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">Tương tác</p>
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">{appName}</h2>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <ActionButton active={isFavorite} onClick={() => setFavorite(!isFavorite)} icon={<Heart className={cn("size-4", isFavorite && "fill-current")} />}>
                Yêu thích
              </ActionButton>
              <ActionButton active={isBookmarked} onClick={() => setBookmark(!isBookmarked)} icon={<Bookmark className={cn("size-4", isBookmarked && "fill-current")} />}>
                Bookmark
              </ActionButton>
              <ActionButton onClick={handleDownload} icon={<Send className="size-4" />}>
                Tải xuống
              </ActionButton>
              <ActionButton onClick={handleReport} icon={<Flag className="size-4" />}>
                Report App
              </ActionButton>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Download Counter" value={stats.downloads.toLocaleString("vi-VN")} />
              <StatCard label="View Counter" value={stats.views.toLocaleString("vi-VN")} />
              <StatCard label="Rating" value={reviewsAverage} />
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Review nhanh</p>
                  <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">Chọn điểm đánh giá</p>
                </div>
                <Stars rating={rating} />
              </div>
              <div className="mt-4 flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const score = index + 1;
                  return (
                    <button
                      key={`score-${score}`}
                      type="button"
                      onClick={() => setRating(score)}
                      className={cn(
                        "grid size-10 place-items-center rounded-full border transition",
                        rating >= score
                          ? "border-amber-300 bg-amber-50 text-amber-500 dark:border-amber-500/30 dark:bg-amber-500/10"
                          : "border-slate-200 bg-white text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-500",
                      )}
                    >
                      <Star className={cn("size-4", rating >= score && "fill-current")} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">QR Download</p>
            <div className="mt-4 rounded-[1.5rem] bg-white p-4 shadow-sm dark:bg-slate-900">
              <QRCode value={`https://nebula-ipa.example/apps/${appSlug}`} size={132} className="h-auto w-full" />
            </div>
            <p className="mt-4 max-w-[14rem] text-sm leading-6 text-slate-500 dark:text-slate-400">
              Quét mã để mở trực tiếp trang chi tiết trên thiết bị di động và tiếp tục cài đặt.
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-[1.3rem] bg-[linear-gradient(135deg,#8b5cf6,#3b82f6)] text-white">
            <MessageSquarePlus className="size-5" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">Bình luận</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Gửi bình luận tự do mà không cần đăng nhập.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3 rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Tên của bạn"
            className="h-12 rounded-[1.2rem] border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Viết cảm nhận của bạn..."
            className="min-h-32 rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="ripple-button rounded-full bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_-18px_rgba(37,99,235,0.72)]"
            >
              Gửi bình luận
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {!commentsReady ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="h-24 animate-pulse rounded-[1.5rem] bg-slate-100 dark:bg-white/5" />
            ))
          ) : (
            storedComments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex items-start gap-3">
                  <div className={cn("grid size-12 shrink-0 place-items-center rounded-[1.2rem] bg-gradient-to-br text-sm font-semibold text-white", comment.avatarColor)}>
                    {comment.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-950 dark:text-white">{comment.author}</p>
                      <span className="text-xs text-slate-400">{comment.timeAgo}</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}

function ActionButton({
  active = false,
  icon,
  children,
  onClick,
}: {
  active?: boolean;
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "ripple-button inline-flex items-center justify-center gap-2 rounded-[1.3rem] border px-4 py-3 text-sm font-medium transition",
        active
          ? "border-sky-500/30 bg-sky-500 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-sky-400/30 hover:text-sky-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}
