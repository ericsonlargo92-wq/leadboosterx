import { createFileRoute, redirect } from "@tanstack/react-router";

// Old URL: /services now lives at /packages.
export const Route = createFileRoute("/_site/services")({
  beforeLoad: () => {
    throw redirect({ to: "/packages", statusCode: 301 });
  },
});
