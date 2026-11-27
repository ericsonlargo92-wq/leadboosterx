import { createFileRoute, redirect } from "@tanstack/react-router";

// Old URL: the Hire Me page now lives on the Services page.
export const Route = createFileRoute("/_site/hire-gohighlevel-freelancer")({
  beforeLoad: () => {
    throw redirect({ to: "/services", hash: "hire", statusCode: 301 });
  },
});
