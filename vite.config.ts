import { access, mkdir } from "fs/promises";

import HotExport from "vite-plugin-hot-export";
import { VitePWA } from "vite-plugin-pwa";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import { config } from "./remix.config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";

const alias = {
  "@/remixed": "/remixed",
  "@/router": "/router",
  "@/layouts": "/src/layouts",
  "@/": "/src",
  ...config.alias,
};

async function createFoldersIfNeeded() {
  const folders = ["./src/assets", "./src/components"];
  await Promise.all(
    folders.map((folder) => access(folder).catch(() => mkdir(folder)))
  ).catch((error) => console.error("Error creating folders:", error));
}

createFoldersIfNeeded();

export default defineConfig({
  resolve: { alias },
  plugins: [
    HotExport(),
    config.compression && [
      chunkSplitPlugin(),
      viteCompression({
        algorithm: "brotliCompress",
        threshold: 100,
      }),
    ],
    config.fontOptimization && ViteWebfontDownload(),
    config.progressiveWebApp && VitePWA({ registerType: "autoUpdate" }),
    config.imagesOptimization &&
      viteImagemin(
        config.imagesOptimizationOptions || {
          gifsicle: { optimizationLevel: 7, interlaced: false },
          optipng: { optimizationLevel: 7 },
          mozjpeg: { quality: 30 },
          webp: { quality: 70 },
          svgo: {
            multipass: true,
            plugins: [
              { name: "removeViewBox" },
              { name: "minifyStyles" },
              { name: "removeMetadata" },
              { name: "removeUselessStrokeAndFill" },
              { name: "reusePaths" },
              { name: "removeEmptyAttrs", active: true },
            ],
          },
        }
      ),
    react(),
  ].filter(Boolean),
});
