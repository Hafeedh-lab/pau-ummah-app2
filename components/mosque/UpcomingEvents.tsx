"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EVENT_CATEGORIES, UPCOMING_EVENTS } from "@/lib/constants";
import type { EventCategory } from "@/types";
import { FilterPills } from "@/components/mosque/FilterPills";
import { AnimatedCard } from "@/components/mosque/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function UpcomingEvents() {
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeCategory === "all") return UPCOMING_EVENTS;
    return UPCOMING_EVENTS.filter((event) => event.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="upcoming-events" className="bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--brand-secondary)]">
              Upcoming events
            </p>
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">
              Join the next uplifting gathering
            </h2>
          </div>
          <FilterPills filters={EVENT_CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {(isLoading ? Array.from({ length: 2 }) : filteredEvents).map((event, index) => (
            <AnimatedCard key={index} delay={index * 140} loading={isLoading}>
              {isLoading ? (
                <Skeleton className="h-64 w-full rounded-3xl" />
              ) : (
                <div className="flex h-full flex-col gap-4 sm:flex-row">
                  <div className="relative h-44 w-full overflow-hidden rounded-3xl sm:h-auto sm:w-1/2">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    {event.featured ? (
                      <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-secondary)] px-3 py-1 text-xs font-semibold text-white">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-secondary)]">
                        {event.category}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--brand-primary)]">{event.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{event.description}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                    {event.registrationLink ? (
                      <Button variant="link" className="px-0 text-[var(--brand-secondary)]" asChild>
                        <Link href={event.registrationLink} target="_blank" rel="noreferrer">
                          Register now
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </div>
              )}
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
