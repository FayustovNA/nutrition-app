import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/', // Ваш локальный API
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          floatPrecision: 2,
        },
      },
    }),
  ],
})
