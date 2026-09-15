import { config } from "./remix.config.js";
import { defineExportConfig } from "vite-plugin-hot-export";

const { autoExports } = config;

const routeConfigs =
  autoExports?.map((path) => ({
    targetDir: "./src/" + path,
    depth: true,
  })) || [];

const configs = [
  { targetDir: "./src/components", depth: true },
  {
    targetDir: "./src/assets",
    autoPrefix: true,
    depth: true,
  },
  ...routeConfigs,
];

export default defineExportConfig({ configs });
