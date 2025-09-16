import Image from "next/image";
import { STORIES_PREVIEWS } from "@/lib/constants";

export function StoriesBar() {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-3">
      {STORIES_PREVIEWS.map((story) => (
        <div key={story.id} className="flex flex-col items-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[var(--brand-secondary)]">
            <Image src={story.thumbnail} alt={story.title} fill className="object-cover" sizes="64px" />
          </div>
          <p className="mt-2 text-xs font-semibold text-white/80">{story.title}</p>
        </div>
      ))}
    </div>
  );
}
