import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, CalendarCheck, CalendarClock, ExternalLink, Fingerprint, Landmark, Maximize2, UserRound, type LucideIcon } from "lucide-react";
import { Lightbox, type LightboxImage } from "~/components/Lightbox";
import { Reveal } from "~/components/motion";
import { Container, CtaBlock, Pill } from "~/components/ui";
import { CERTIFICATE, CREDENTIAL } from "~/lib/offer";
import { seo } from "~/lib/seo";
import { card, cx, focusRing } from "~/lib/ui";

export const Route = createFileRoute("/_site/certification")({
  head: () =>
    seo({
      title: "Certification — HighLevel Certified Admin | LeadBoosterX",
      description:
        "Ericson Largo's HighLevel Admin Certification from HighLevel University, with a link to verify the credential on HighLevel's certificate site.",
      path: "/certification",
    }),
  component: CertificationPage,
});

const IMAGE: LightboxImage = {
  src: CERTIFICATE.image,
  alt: `${CERTIFICATE.name} certificate of completion awarded to ${CERTIFICATE.awardedTo} by ${CERTIFICATE.issuer}`,
  caption: `${CERTIFICATE.name} · ${CERTIFICATE.issuer}`,
};

function CertificationPage() {
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  const details: { icon: LucideIcon; label: string; value: string; mono?: boolean }[] = [
    { icon: UserRound, label: "Awarded to", value: CERTIFICATE.awardedTo },
    { icon: Landmark, label: "Issued by", value: CERTIFICATE.issuer },
    { icon: CalendarCheck, label: "Issued on", value: CERTIFICATE.issued },
    { icon: CalendarClock, label: "Valid until", value: CERTIFICATE.validUntil },
    { icon: Fingerprint, label: "Credential ID", value: CERTIFICATE.id, mono: true },
  ];

  return (
    <Container className="py-12 sm:py-16">
      <Pill>Certification</Pill>
      <h1 className="mt-5 text-4xl font-bold sm:text-5xl">{CREDENTIAL}.</h1>
      <p className="mt-4 max-w-2xl text-lg">
        I passed the {CERTIFICATE.name} from {CERTIFICATE.issuer}. The certificate is issued and hosted by HighLevel, so you
        can check it yourself on their certificate site.
      </p>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Reveal>
          <figure>
            <button
              type="button"
              onClick={() => setLightbox(IMAGE)}
              aria-label="Enlarge the certificate"
              className={cx(
                "group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-xl shadow-[oklch(0.2_0.05_260/0.15)]",
                focusRing,
              )}
            >
              <img
                src={CERTIFICATE.image}
                alt={IMAGE.alt}
                width={1204}
                height={1504}
                className="block h-auto w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <span className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-lg bg-surface/90 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="size-4" aria-hidden="true" />
              </span>
            </button>
            <figcaption className="mt-2 text-xs text-muted-foreground">Certificate of completion · click to enlarge</figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-8">
          <div className={cx(card, "p-6")}>
            <p className="inline-flex items-center gap-1.5 rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
              <BadgeCheck className="size-4" aria-hidden="true" />
              {CREDENTIAL}
            </p>
            <h2 className="mt-4 text-xl font-semibold">Credential details</h2>
            <dl className="mt-4 divide-y divide-border">
              {details.map(({ icon: Icon, label, value, mono }) => (
                <div key={label} className="flex items-start gap-3 py-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <dt className="w-28 shrink-0 text-sm text-muted-foreground">{label}</dt>
                  <dd className={cx("min-w-0 break-all text-sm font-medium text-foreground", mono && "font-mono text-xs")}>{value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={CERTIFICATE.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90",
                focusRing,
              )}
            >
              <BadgeCheck className="size-4" aria-hidden="true" />
              Verify credential
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">Opens HighLevel's certificate page in a new tab.</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-16">
        <CtaBlock title="Want a certified admin on your GoHighLevel account?" />
      </div>

      <Lightbox image={lightbox} onClose={close} />
    </Container>
  );
}
