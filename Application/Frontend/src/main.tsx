import ReactDOM from 'react-dom/client'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {routeTree} from './routeTree.gen'
import {StrictMode} from "react";
import {AuthProvider} from "@/providers/auth-provider.tsx";
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import {useAuth} from "@/hooks/use-auth.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

const queryClient = new QueryClient()

// Set up a Router instance
const router = createRouter({
    routeTree,
    context: {
        queryClient,
        auth: undefined!,
        getTitle: () => "",
    },
    defaultPreload: 'intent',
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
})

// Register things for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// eslint-disable-next-line react-refresh/only-export-components
function InnerApp() {
    const auth = useAuth()
    return <RouterProvider router={router} context={{
        queryClient,
        auth
    }}/>
}

// eslint-disable-next-line react-refresh/only-export-components
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <AuthProvider>
                    <Toaster/>
                    <InnerApp/>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <App/>
        </StrictMode>
    )
}
