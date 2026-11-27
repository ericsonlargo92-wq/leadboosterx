import { createFileRoute, redirect } from "@tanstack/react-router";

// Old URL: Packages now lives on the Services page.
export const Route = createFileRoute("/_site/packages")({
  beforeLoad: () => {
    throw redirect({ to: "/services", hash: "packages", statusCode: 301 });
  },
});
