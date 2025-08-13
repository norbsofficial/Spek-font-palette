import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/Spek-font-palette/", // must match repo name exactly, with slashes
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
