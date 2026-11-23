import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";

// Media in /public isn't content-hashed, so cache it for a week (and serve stale while revalidating)
// instead of the default "always revalidate". Rename a file if it must change immediately.
const media = { headers: { "cache-control": "public, max-age=604800, stale-while-revalidate=86400" } };

export default defineConfig({
  server: { port: 3000 },
  resolve: {
    alias: { "~": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro({
      routeRules: {
        "/**": {
          headers: {
            "x-content-type-options": "nosniff",
            "referrer-policy": "strict-origin-when-cross-origin",
            "x-frame-options": "SAMEORIGIN",
            "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=()",
          },
        },
        "/images/**": media,
        "/projects/**": media,
        "/broll/**": media,
        "/audio/**": media,
      },
    }),
    viteReact(),
  ],
});
