import { config } from "./remix.config.js";
import { defineExportConfig } from "vite-plugin-hot-export";

const defaultConfigs = [
  config.autoExportComponents && {
    targetDir: "./src/components",
  },
  config.autoExportAssets && {
    targetDir: "./src/assets",
    autoPrefix: true,
    depth: true,
  },
].filter(Boolean);

const routeConfigs =
  config.autoExports?.map((route: { path: any }) => ({
    targetDir: route.path,
  })) || [];

export default defineExportConfig({
  configs: [...defaultConfigs, ...routeConfigs],
});
