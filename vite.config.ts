import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        react(),
        svgrPlugin({
            svgrOptions: { icon: true },
        }),
    ],
});
