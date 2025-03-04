import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Automatically create separate chunks for large modules
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/src/Pages/")) {
            return "pages";
          }
          if (id.includes("/src/Components/")) {
            return "components";
          }
        },
      },
    },
  },
});
