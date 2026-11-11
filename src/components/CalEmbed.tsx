import { lazy, Suspense, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { BOOKING, bookingUrl } from "~/lib/config";

// The Cal.com embed touches `window`, so it is loaded only in the browser after hydration.
const CalInline = lazy(() => import("./CalInline"));

export function CalEmbed() {
  const [mounted, setMounted] = useState(false);
  const theme = "dark" as const; // the site is dark-only
  useEffect(() => setMounted(true), []);

  return (
    <div>
      <div className="relative min-h-[640px] overflow-hidden rounded-2xl border border-border bg-surface">
        {mounted ? (
          <Suspense fallback={<CalSkeleton />}>
            <CalInline calLink={BOOKING.calLink} theme={theme} />
          </Suspense>
        ) : (
          <CalSkeleton />
        )}
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Calendar not loading?{" "}
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
          Open it in a new tab
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}

function CalSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse p-6" aria-label="Loading calendar" role="status">
      <div className="h-6 w-40 rounded bg-hover" />
      <div className="mt-6 grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-hover" />
        ))}
      </div>
    </div>
  );
}
