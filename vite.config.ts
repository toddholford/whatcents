import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy math library into its own chunk
          mathjs: ["mathjs"],
          // Split Supabase into its own chunk
          supabase: ["@supabase/supabase-js", "@supabase/auth-ui-react", "@supabase/auth-ui-shared"],
          // Split UI libraries
          framer: ["framer-motion"],
          // React core
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
