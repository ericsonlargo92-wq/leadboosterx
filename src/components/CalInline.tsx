import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// Brand blue, passed to Cal.com's own UI (outside our token system).
const BRAND_COLOR = "#2563EB";

export default function CalInline({ calLink, theme }: { calLink: string; theme: "light" | "dark" }) {
  useEffect(() => {
    let cancelled = false;
    getCalApi().then((cal) => {
      if (cancelled) return;
      cal("ui", {
        theme,
        styles: { branding: { brandColor: BRAND_COLOR } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [theme]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: 640, overflow: "scroll" }}
      config={{ layout: "month_view", theme }}
    />
  );
}
