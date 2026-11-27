import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, BadgeCheck, Briefcase, FolderGit2, HelpCircle, Home, Package, UserRound, type LucideIcon } from "lucide-react";
import { CREDENTIAL, CTA_LABEL } from "~/lib/offer";
import { BrandLogo } from "./BrandLogo";
import { btnPrimary, cx, focusRing } from "~/lib/ui";

type NavItem = { to: "/" | "/projects" | "/certification" | "/packages" | "/hire-gohighlevel-freelancer" | "/about" | "/contact"; label: string; icon: LucideIcon };

export const NAV: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/certification", label: "Certification", icon: Award },
  { to: "/packages", label: "Packages", icon: Package },
  { to: "/hire-gohighlevel-freelancer", label: "Hire Me", icon: Briefcase },
  { to: "/about", label: "About", icon: UserRound },
  { to: "/contact", label: "FAQs & Contact", icon: HelpCircle },
];

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-2">
        <Link to="/" onClick={onNavigate} className={cx("rounded-lg", focusRing)} aria-label="LeadBoosterX Revenue Systems, home">
          <BrandLogo size="md" />
        </Link>
      </div>

      <ProfileCard onNavigate={onNavigate} />

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
        <Link to="/book-a-call" onClick={onNavigate} className={cx(btnPrimary, "w-full whitespace-nowrap px-4")}>
          {CTA_LABEL}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
        <p className="mt-2 text-center text-xs text-muted-foreground">Free 30-minute call. No obligation.</p>
      </div>
    </div>
  );
}

function ProfileCard({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-2.5">
      <div>
        {/* No photo here: Ericson introduces himself in the homepage intro video. */}
        <div className="min-w-0 space-y-1.5 px-1 py-1">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            Available for projects
          </p>
          <Link
            to="/certification"
            onClick={onNavigate}
            title="See the certificate"
            className={cx(
              "inline-flex items-center gap-1.5 rounded-md border border-success/30 bg-success/10 px-1.5 py-0.5 text-[0.7rem] font-semibold text-success hover:bg-success/20",
              focusRing,
            )}
          >
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            {CREDENTIAL}
          </Link>
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <span className="rounded-md border border-soft-border bg-soft px-1.5 py-0.5 font-mono text-[0.65rem] font-medium text-primary">
              Remote
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="theme-dark fixed border border-border bg-background shadow-2xl shadow-[oklch(0.2_0.05_260/0.35)] inset-y-3 left-3 z-30 hidden w-[16.5rem] overflow-y-auto rounded-3xl lg:block">
      <SidebarContent />
    </aside>
  );
}
