"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Heart, Share2, Eye } from "lucide-react";
import { MediaItem as MediaItemType } from "@/types";
import { MediaPlayer } from "@/components/feed/MediaPlayer";
import { EngagementButton } from "@/components/feed/EngagementButton";
import { CommentsDrawer } from "@/components/feed/CommentsDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersection } from "@/lib/hooks/useIntersection";

interface MediaItemProps {
  item: MediaItemType;
  onLike: (id: string) => void;
  onShare: (item: MediaItemType) => void;
}

export function MediaItem({ item, onLike, onShare }: MediaItemProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, ref } = useIntersection<HTMLDivElement>({
    threshold: 0.6,
  });
  const [showHeart, setShowHeart] = useState(false);
  const [scale, setScale] = useState(1);
  const pointers = useRef<Map<number, PointerEvent>>(new Map());

  const handleDoubleTap = useCallback(() => {
    onLike(item.id);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  }, [item.id, onLike]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, event.nativeEvent);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, event.nativeEvent);
    if (pointers.current.size === 2) {
      const [first, second] = Array.from(pointers.current.values());
      const distance = Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
      const initial = Number(containerRef.current?.dataset.initialDistance ?? distance);
      if (!containerRef.current?.dataset.initialDistance) {
        if (containerRef.current) containerRef.current.dataset.initialDistance = String(distance);
        return;
      }
      const ratio = distance / initial;
      setScale(Math.min(2.5, Math.max(1, ratio)));
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) {
      setScale(1);
      if (containerRef.current) delete containerRef.current.dataset.initialDistance;
    }
  };

  return (
    <div ref={ref} className="relative h-screen w-full snap-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      <div className="flex h-full items-center justify-center">
        <div
          ref={containerRef}
          className="relative flex h-[85vh] w-full max-w-[420px] flex-col justify-end overflow-hidden rounded-[32px]"
          onDoubleClick={handleDoubleTap}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: "none" }}
        >
          {item.type === "video" ? (
            <MediaPlayer src={item.url} poster={item.thumbnail} isActive={isVisible} />
          ) : (
            <motion.div
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative h-full w-full"
            >
              <Image src={item.url} alt={item.title} fill className="object-cover" sizes="420px" />
            </motion.div>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

          <div className="absolute bottom-20 left-4 right-24 space-y-4 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--brand-secondary)]">{item.eventType}</p>
              <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.description}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/60">
              <span>{new Date(item.date).toLocaleDateString()}</span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {item.views.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="absolute bottom-24 right-4 flex flex-col items-center gap-4">
            <EngagementButton icon={Heart} label="Like" count={item.likes} onClick={handleDoubleTap} />
            <CommentsDrawer count={Math.max(1, Math.round(item.views / 400))} />
            <EngagementButton icon={Share2} label="Share" onClick={() => onShare(item)} />
          </div>

          <AnimatePresence>
            {showHeart ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-[var(--brand-secondary)]"
              >
                <Heart className="h-24 w-24 fill-[var(--brand-secondary)]" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
