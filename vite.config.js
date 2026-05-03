import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,        //  shu yerda  port o‘zgartirasan
    strictPort: true   // (optional) band bo‘lsa error beradi
  }
});
