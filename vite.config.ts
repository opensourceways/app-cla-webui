import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "./src")}/`,
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  plugins: [
    vue(),
    vueJsx({}),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    Icons({
      compiler: "vue3",
      customCollections: {
        app: FileSystemIconLoader("./src/assets/svg-icons"),
      },
    }),
    ElementPlus({
      useSource: true,
    }),
  ],
  server: {
    port: 80,
    proxy: {
      "/api/": {
        target: "http://159.138.58.253:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
