/// <reference types="vitest/config" />
import path from "path";
import {defineConfig} from 'vite';
import tanstackRouter from '@tanstack/router-plugin/vite';
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import {playwright} from "@vitest/browser-playwright";

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
        globals: true,
        testTimeout: 10000,
        browser: {
            enabled: true,
            viewport: {width: 1280, height: 720},
            provider: playwright(),
            instances: [
                {browser: 'chromium'},
            ],
        },
        setupFiles: 'src/testing/vitest.setup.ts',
        reporters: ['default'],
        outputFile: 'report/vitest-report.html',
        coverage: {
            include: ['src/**'],
            exclude: ['src/testing/**'],
            reporter: ["html"]
        },
    },
});