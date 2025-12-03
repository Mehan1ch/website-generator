/// <reference types="vitest/config" />
import path from "path";
import {defineConfig} from 'vite';
import tanstackRouter from '@tanstack/router-plugin/vite';
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        tailwindcss(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        // ...,
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        port: 5173,
    },
    test: {
        // ...
    },
});