import path from "path"
import {defineConfig} from 'vite'
import {TanStackRouterVite} from '@tanstack/router-plugin/vite'
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
        TanStackRouterVite({target: 'react', autoCodeSplitting: true}),
        react(),
        tailwindcss(),
        // ...,
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
