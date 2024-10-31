// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import EnvironmentPlugin from "vite-plugin-environment";
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin({
      API_BASE_URL: "https://imdb-clone-backend-j632.onrender.com",
      // API_BASE_URL: "//localhost:8080",
      FILE_DIR: "/home/root.pam/BHN/files",
    }),
  ],
});