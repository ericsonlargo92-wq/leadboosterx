import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "~/components/SiteLayout";

// Pathless layout: every page except /book-a-call gets the sidebar, mobile bar and footer.
export const Route = createFileRoute("/_site")({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});
