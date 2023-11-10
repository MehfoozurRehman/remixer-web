import HotExport from "vite-plugin-hot-export";
import { VitePWA } from "vite-plugin-pwa";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import { config } from "./remix.config";
import { defineConfig } from "vite";
import fs from "fs";
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

const aliasForJsConfig = Object.keys(alias).reduce((acc, key) => {
  const value = alias[key].replace("/", "./");
  acc[key] = [`${value}/*`];
  return acc;
}, {});

const jsConfig = {
  compilerOptions: {
    baseUrl: ".",
    target: "esnext",
    paths: aliasForJsConfig,
  },
};

fs.writeFileSync("./jsconfig.json", JSON.stringify(jsConfig, null, 2));

export default defineConfig({
  resolve: { alias },
  plugins: [
    config.autoExport && HotExport(),
    config.compression && chunkSplitPlugin(),
    config.fontOptimization && ViteWebfontDownload(),
    config.progressiveWebApp && VitePWA({ registerType: "autoUpdate" }),
    config.compression &&
      viteCompression({
        algorithm: "brotliCompress",
        threshold: 100,
      }),
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
  ],
});
