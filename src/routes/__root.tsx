/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { AlertTriangle, ArrowLeft, Compass, RotateCcw } from "lucide-react";
import { ThemeProvider, themeScript } from "~/components/theme-provider";
import { SiteLayout } from "~/components/SiteLayout";
import { Container } from "~/components/ui";
import { seo } from "~/lib/seo";
import { btnPrimary, btnSecondary } from "~/lib/ui";
import appCss from "~/styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const base = seo({
      title: "LeadBoosterX — Meta Ads, Funnels & Follow-Up That Book More Calls",
      description:
        "Done-for-you Meta Ads, funnels and follow-up for coaches, online programs and home service businesses. Live in 14 days, no long-term contract.",
      path: "/",
    });
    return {
      meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "theme-color", content: "#2563EB" }, ...base.meta],
      links: [
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap",
        },
        { rel: "stylesheet", href: appCss },
      ],
      scripts: [{ children: themeScript }],
    };
  },
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootError,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <SiteLayout>
      <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-soft text-primary">
          <Compass className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-sm text-muted-foreground">404 · Page not found</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">This page doesn't exist.</h1>
        <p className="mt-4 max-w-lg">The link may be old or mistyped. Here are a few places to go instead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className={btnPrimary}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>
          <Link to="/projects" className={btnSecondary}>
            View projects
          </Link>
        </div>
      </Container>
    </SiteLayout>
  );
}

function RootError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  return (
    <Container className="flex min-h-dvh flex-col items-start justify-center py-20">
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-4xl font-bold">Something went wrong.</h1>
      <p className="mt-4 max-w-lg">An unexpected error stopped this page from loading. Try again, or head back home.</p>
      {import.meta.env.DEV && (
        <pre className="mt-4 max-w-full overflow-auto rounded-xl border border-border bg-surface p-4 font-mono text-xs text-destructive">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className={btnPrimary}
          onClick={() => {
            reset();
            router.invalidate();
          }}
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Try again
        </button>
        <Link to="/" className={btnSecondary}>
          Back to home
        </Link>
      </div>
    </Container>
  );
}
