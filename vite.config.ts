import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

// Local o servidor propio: node_server. En Vercel define NITRO_PRESET=vercel.
export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({ server: { entry: "server" } }),
    nitro({
      preset: process.env.NITRO_PRESET ?? "node_server",
      // Las evaluaciones con fotos tardan más de 10 s: Vercel permite hasta 300 s.
      vercel: { functions: { maxDuration: 300 } },
    }),
    react(),
  ],
});
