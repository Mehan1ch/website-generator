import path from "path"
import {defineConfig} from 'vite'
import tanstackRouter from '@tanstack/router-plugin/vite'
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        tailwindcss(),
        react(),
        // ...,
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
