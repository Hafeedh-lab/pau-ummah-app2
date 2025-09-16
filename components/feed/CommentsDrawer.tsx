"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import type { CommentItem } from "@/types";
import { Button } from "@/components/ui/button";

interface CommentsDrawerProps {
  comments?: CommentItem[];
  count?: number;
}

const FALLBACK_COMMENTS: CommentItem[] = [
  {
    id: "1",
    author: "Fatima",
    message: "This was such an inspiring event—may Allah reward the organisers!",
    timestamp: "2h ago",
  },
  {
    id: "2",
    author: "Khalid",
    message: "The reflections shared during the circle were profound. JazakhAllah khair.",
    timestamp: "5h ago",
  },
];

export function CommentsDrawer({ comments = FALLBACK_COMMENTS, count }: CommentsDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="rounded-full bg-black/30 px-4 text-white hover:bg-black/50">
          View Comments {count ? `(${count})` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] max-w-full border-l border-white/10 bg-slate-950/80 text-white backdrop-blur-2xl">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-semibold text-white">Community reflections</SheetTitle>
        </SheetHeader>
        <ScrollArea className="mt-6 h-[70vh] pr-4">
          <ul className="space-y-6">
            {comments.map((comment) => (
              <li key={comment.id} className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <Avatar alt={comment.author} className="bg-white/20 text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">{comment.author}</p>
                    <span className="text-xs text-white/60">{comment.timestamp}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/80">{comment.message}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Share your thoughts</p>
          <p className="mt-2 text-sm text-white/80">
            Use the mosque WhatsApp group to send in reflections and duas—we spotlight heartfelt messages during our events.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
