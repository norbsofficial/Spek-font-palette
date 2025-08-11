// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/Spek-font-palette/", // must exactly match your repo name
  plugins: [react()],
});
