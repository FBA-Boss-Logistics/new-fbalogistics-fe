import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import jsconfigPaths from "vite-jsconfig-paths";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), jsconfigPaths(), splitVendorChunkPlugin()],

    server: {
        host: true,
        port: 3000
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        components: path.resolve(__dirname, 'src/components'),
      },
    },
});
