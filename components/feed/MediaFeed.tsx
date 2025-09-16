"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MEDIA_FILTERS, FEATURED_MEDIA } from "@/lib/constants";
import type { EventCategory, MediaItem as MediaItemType } from "@/types";
import { useMediaFeed } from "@/lib/hooks/useMediaFeed";
import { MediaItem } from "@/components/feed/MediaItem";
import { StoriesBar } from "@/components/feed/StoriesBar";
import { FilterPills } from "@/components/mosque/FilterPills";
import { wait } from "@/lib/utils";

export function MediaFeed() {
  const [category, setCategory] = useState<EventCategory | "all">("all");
  const { mediaItems, hasMore, loadMore, likeMedia, isLoading } = useMediaFeed({ category });
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        void loadMore();
      }
    }, { threshold: 0.6 });

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const combinedItems = useMemo<MediaItemType[]>(() => {
    if (mediaItems.length > 0) return mediaItems;
    return FEATURED_MEDIA;
  }, [mediaItems]);

  const handleShare = async (item: MediaItemType) => {
    const url = item.url;
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text: item.description, url });
      } catch (error) {
        console.error("Share cancelled", error);
      }
    } else {
      await navigator.clipboard.writeText(url);
      await wait(600);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <div className="px-6 pt-8">
        <h1 className="text-3xl font-semibold">PAU Media Moments</h1>
        <p className="mt-2 text-sm text-white/70">
          Swipe through reflections from recent programmes, student initiatives, and joyful gatherings.
        </p>
        <div className="mt-6">
          <StoriesBar />
        </div>
        <div className="mt-4">
          <FilterPills filters={MEDIA_FILTERS} active={category} onChange={setCategory} />
        </div>
      </div>

      <div className="relative mt-4 flex-1 overflow-y-scroll snap-y snap-mandatory">
        <div className="flex flex-col">
          {combinedItems.map((item) => (
            <MediaItem key={item.id} item={item} onLike={likeMedia} onShare={handleShare} />
          ))}
          <div ref={sentinelRef} className="h-24" />
        </div>
        {!hasMore && !isLoading ? (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-6 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
            You have reached the end
          </div>
        ) : null}
      </div>
    </div>
  );
}
