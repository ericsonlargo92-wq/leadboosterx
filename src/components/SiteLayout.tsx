import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileBar } from "./MobileBar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh lg:pl-72">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Sidebar />
      <MobileBar />
      <main id="main" className="overflow-x-clip">
        {children}
      </main>
      <Footer />
    </div>
  );
}
