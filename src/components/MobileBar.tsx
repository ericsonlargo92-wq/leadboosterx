import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./theme-provider";
import { SidebarContent } from "./Sidebar";
import { cx, focusRing } from "~/lib/ui";

export function MobileBar() {
  const [open, setOpen] = useState(false);
  const pathname = useLocation({ select: (l) => l.pathname });
  const closeBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Escape to close, lock body scroll, move focus in/out.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      menuBtn.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-border bg-surface/90 px-4 backdrop-blur lg:hidden">
        <Link to="/" className={cx("rounded-lg", focusRing)} aria-label="LeadBoosterX home">
          <BrandLogo size="sm" />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className={cx(
              "inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground hover:bg-hover",
              focusRing,
            )}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className={cx("fixed inset-0 z-50 lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cx("absolute inset-0 bg-black/40 transition-opacity duration-200", open ? "opacity-100" : "opacity-0")}
        />
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!open}
          className={cx(
            "absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto border-r border-border bg-surface shadow-xl transition-transform duration-200 ease-out motion-reduce:transition-none",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <DrawerBody onClose={() => setOpen(false)} closeRef={closeBtn} />
        </div>
      </div>
    </>
  );
}

function DrawerBody({ onClose, closeRef }: { onClose: () => void; closeRef: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <div className="relative">
      <div className="flex justify-end px-5 pt-4">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className={cx(
            "inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-hover",
            focusRing,
          )}
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <SidebarContent onNavigate={onClose} />
    </div>
  );
}
