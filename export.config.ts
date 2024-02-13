import { config } from "./remix.config.js";
import { defineExportConfig } from "vite-plugin-hot-export";

export default defineExportConfig({
  configs: [
    config.autoExportComponents && {
      targetDir: "./src/components",
    },
    config.autoExportAssets && {
      targetDir: "./src/assets",
      autoPrefix: true,
      depth: true,
    },
  ].filter(Boolean),
});
