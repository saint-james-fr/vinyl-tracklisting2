import { defineConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import legacy from "@vitejs/plugin-legacy";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: { open: true },
  base: "/",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "src/css/variables.scss";
        @import "src/css/mixins.scss";
        `,
      },
    },
  },
  build: {
    sourcemap: true,
    outDir: "./dist",
  },
  clearScreen: false,
  plugins: [
    svelte({ preprocess: vitePreprocess() }),
    legacy({
      targets: [
        "> 0.2%", // Global usage statistics
        "not IE 11", // Exclude Internet Explorer 11
        "not dead", // Exclude browsers with no activity
        "safari >= 9", // Target Safari version 9 and above
      ],
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      stores: `${path.resolve(__dirname, "./src/stores.ts")}`,
      lib: `${path.resolve(__dirname, "./src/lib/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      public: `${path.resolve(__dirname, "./public")}`,
      config: `${path.resolve(__dirname, "./src/config")}`,
    },
  },
  optimizeDeps: {
    exclude: ["tinro"],
  },
});
