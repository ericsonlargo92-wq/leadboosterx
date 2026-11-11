import { Link } from "@tanstack/react-router";
import { Facebook, Mail } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { NAV } from "./Sidebar";
import { CONTACT } from "~/lib/config";
import { cx, focusRing } from "~/lib/ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <Link to="/" className={cx("inline-block rounded-lg", focusRing)} aria-label="LeadBoosterX home">
              <BrandLogo size="md" />
            </Link>
            <p className="text-sm font-medium text-foreground">Ericson Largo · Lead Generation &amp; Automation</p>
            <p className="font-mono text-xs text-muted-foreground">Ads · Funnels · Follow-Up for coaches, online programs &amp; home services</p>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className={cx("rounded text-body hover:text-primary", focusRing)}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} LeadBoosterX · Ericson Largo
            <span className="mx-2" aria-hidden="true">·</span>
            <Link to="/privacy" className={cx("rounded hover:text-primary", focusRing)}>
              Privacy
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${CONTACT.email}`} className={cx("inline-flex items-center gap-2 rounded hover:text-primary", focusRing)}>
              <Mail className="size-4" aria-hidden="true" />
              <span className="break-all">{CONTACT.email}</span>
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={cx("inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-hover hover:text-primary", focusRing)}
            >
              <Facebook className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
