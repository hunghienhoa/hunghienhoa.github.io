"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(initialCount = 4, step = 4) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialCount);

  useEffect(() => {
    const node = sentinelRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisibleCount((currentCount) => currentCount + step);
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [step]);

  return { sentinelRef, visibleCount };
}
