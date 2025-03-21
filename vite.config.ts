import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all IPs
    port: 9000, // Ensure it runs on the correct port
    strictPort: true, // Avoid conflicts
  },
});
