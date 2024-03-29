import { access, mkdir, writeFile } from "fs/promises";

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
  "@components": "/src/components",
  "@assets": "/src/assets",
  "@router": "/router",
  "@layouts": "/src/layouts",
  ...config.alias,
};

const aliasForJsConfig = Object.fromEntries(
  Object.entries(alias).map(([key, value]) => [
    key,
    [value.replace("/", "./") + "/*"],
  ])
);

const jsConfig = {
  compilerOptions: {
    baseUrl: ".",
    target: "esnext",
    paths: aliasForJsConfig,
  },
};

async function createFoldersIfNeeded() {
  try {
    await Promise.all([
      access(assetsFolder).catch(() => mkdir(assetsFolder)),
      access(componentsFolder).catch(() => mkdir(componentsFolder)),
    ]);
  } catch (error) {
    console.error("Error creating folders:", error);
  }
}

async function writeJsConfig() {
  try {
    await writeFile("./jsconfig.json", JSON.stringify(jsConfig, null, 2));
  } catch (error) {
    console.error("Error writing jsconfig.json:", error);
  }
}

const assetsFolder = "./src/assets";
const componentsFolder = "./src/components";

async function configure() {
  await createFoldersIfNeeded();
  await writeJsConfig();
}

configure();

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
