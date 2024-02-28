import { config } from "./remix.config.js";
import { defineExportConfig } from "vite-plugin-hot-export";

const { autoExportComponents, autoExportAssets, autoExports } = config;

const defaultConfigs = [
  autoExportComponents && { targetDir: "./src/components" },
  autoExportAssets && {
    targetDir: "./src/assets",
    autoPrefix: true,
    depth: true,
  },
].filter(Boolean);

const routeConfigs =
  autoExports?.map(({ path }) => ({ targetDir: path })) || [];

export default defineExportConfig({
  configs: [...defaultConfigs, ...routeConfigs],
});
