import {defineConfig} from 'vite'
import {TanStackRouterVite} from '@tanstack/router-plugin/vite'
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
        TanStackRouterVite({target: 'react', autoCodeSplitting: true}),
        react(),
        // ...,
    ],
})
