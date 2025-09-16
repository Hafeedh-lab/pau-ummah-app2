import Image from "next/image";
import { PAST_EVENTS } from "@/lib/constants";
import { AnimatedCard } from "@/components/mosque/AnimatedCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PastEvents() {
  return (
    <section id="past-events" className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-4 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--brand-secondary)]">Past highlights</p>
          <h2 className="text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">
            Moments that shaped our community
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Relive powerful gatherings filled with dua, learning, and service. Each event strengthens the bonds of our Ummah on
            campus.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PAST_EVENTS.map((event, index) => (
            <AnimatedCard key={event.id} delay={index * 120}>
              <div className="flex h-full flex-col">
                <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-secondary)]">
                    {event.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--brand-primary)]">{event.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{event.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-sm text-slate-500">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                  {event.galleryLink ? (
                    <Button variant="link" className="px-0 text-[var(--brand-secondary)]" asChild>
                      <Link href={event.galleryLink} target="_blank" rel="noreferrer">
                        View gallery
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
