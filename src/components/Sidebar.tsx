import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FolderGit2, HelpCircle, Home, Package, UserRound, type LucideIcon } from "lucide-react";
import { CTA_LABEL } from "~/lib/offer";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./theme-provider";
import { quarterLabel } from "~/lib/seo";
import { btnPrimary, cx, focusRing } from "~/lib/ui";

type NavItem = { to: "/" | "/projects" | "/packages" | "/about" | "/contact"; label: string; icon: LucideIcon };

export const NAV: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/packages", label: "Packages", icon: Package },
  { to: "/about", label: "About", icon: UserRound },
  { to: "/contact", label: "FAQs & Contact", icon: HelpCircle },
];

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-2">
        <Link to="/" onClick={onNavigate} className={cx("rounded-lg", focusRing)} aria-label="LeadBoosterX home">
          <BrandLogo size="md" />
        </Link>
        <ThemeToggle />
      </div>

      <ProfileCard />

      <nav aria-label="Main">
        <ul className="flex flex-col gap-0.5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={onNavigate}
                activeOptions={{ exact: to === "/" }}
                className={cx(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-hover hover:text-foreground",
                  "data-[status=active]:bg-soft data-[status=active]:text-primary",
                  focusRing,
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span aria-hidden="true" className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-primary" />
                    )}
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    {label}
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <Link to="/book-a-call" onClick={onNavigate} className={cx(btnPrimary, "w-full")}>
          {CTA_LABEL}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
        <p className="mt-2 text-center text-xs text-muted-foreground">Free 30-minute call. No obligation.</p>
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-2.5">
      <div className="flex gap-3 lg:block">
        <img
          src="/images/ericson.jpg"
          alt="Ericson Largo, founder of LeadBoosterX"
          width={800}
          height={1000}
          className="aspect-[4/5] w-20 shrink-0 rounded-xl object-cover lg:max-h-[30vh] lg:w-full lg:object-[50%_20%]"
        />
        <div className="min-w-0 space-y-1.5 px-1 py-1 lg:pt-2.5">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            Available for projects
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <span className="rounded-md border border-soft-border bg-soft px-1.5 py-0.5 font-mono text-[0.65rem] font-medium text-primary">
              Remote
            </span>
            <span>Philippines ⇄ Global clients</span>
          </div>
          <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground" suppressHydrationWarning>
            {quarterLabel()} — Booking new projects
          </p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 overflow-y-auto border-r border-border bg-surface lg:block">
      <SidebarContent />
    </aside>
  );
}
