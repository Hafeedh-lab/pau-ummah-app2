"use client";

import { PRAYER_SCHEDULE } from "@/lib/constants";
import { usePrayerTimes } from "@/lib/hooks/usePrayerTimes";
import { CountdownTimer } from "@/components/mosque/CountdownTimer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PrayerTimings() {
  const { state } = usePrayerTimes(PRAYER_SCHEDULE);
  const { currentPrayer, nextPrayer, timeUntilNext, progress } = state;

  return (
    <section id="prayer-times" className="relative bg-white py-20">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#001f3f] via-[#34495e] to-[#58a44d]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-12 px-6 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--brand-secondary)]">
              Prayer Timings
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">
              Stay aligned with the rhythm of salah
            </h2>
            <p className="mt-4 max-w-xl text-base text-slate-600">
              We maintain updated prayer times for the PAU campus community using reliable calculation methods tailored to Lagos.
              Never miss a congregation with smart reminders and the countdown to the next salah.
            </p>
          </motion.div>

          {timeUntilNext && nextPrayer ? (
            <div className="rounded-3xl bg-slate-50/80 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-secondary)]">
                Up Next: {nextPrayer.displayName}
              </p>
              <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
                <CountdownTimer
                  label={nextPrayer.displayName ?? nextPrayer.name}
                  hours={timeUntilNext.hours}
                  minutes={timeUntilNext.minutes}
                  seconds={timeUntilNext.seconds}
                  progress={progress}
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                    <span>Call to Prayer</span>
                    <span className="font-semibold text-[var(--brand-primary)]">{nextPrayer.callToPrayer}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                    <span>Congregation</span>
                    <span className="font-semibold text-[var(--brand-primary)]">{nextPrayer.congregation}</span>
                  </div>
                  <Button variant="primary" className="w-full">
                    Subscribe for reminders
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <motion.div
          className="flex-1 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-floating"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="w-full overflow-hidden">
              <thead className="bg-slate-50/80 text-left text-sm uppercase tracking-[0.3em] text-slate-500">
                <tr>
                  <th className="px-4 py-4">Prayer</th>
                  <th className="px-4 py-4">Adhan</th>
                  <th className="px-4 py-4">Iqamah</th>
                  <th className="px-4 py-4">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRAYER_SCHEDULE.map((prayer) => {
                  const isActive = currentPrayer?.name === prayer.name;
                  const isNext = nextPrayer?.name === prayer.name;
                  return (
                    <tr
                      key={prayer.name}
                      className={cn(
                        "transition-colors",
                        isActive ? "bg-[var(--brand-secondary)]/10" : isNext ? "bg-slate-50" : "bg-white",
                      )}
                    >
                      <td className="px-4 py-4 text-sm font-semibold text-[var(--brand-primary)]">
                        {prayer.displayName ?? prayer.name}
                        {isActive ? (
                          <span className="ml-2 inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold text-[var(--brand-secondary)]">
                            Now
                          </span>
                        ) : null}
                        {isNext && !isActive ? (
                          <span className="ml-2 inline-flex items-center rounded-full bg-[var(--brand-secondary)]/20 px-2 py-1 text-xs font-semibold text-[var(--brand-secondary)]">
                            Next
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">{prayer.callToPrayer}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{prayer.congregation}</td>
                      <td className="px-4 py-4">
                        <Progress value={isActive ? (progress ?? 0) * 100 : isNext ? 5 : 0} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
