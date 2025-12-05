import {createMemoryHistory, createRouter, RouterProvider} from '@tanstack/react-router';
import {routeTree} from '@/routeTree.gen.ts';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render} from "vitest-browser-react";
import {Toaster} from "@/components/ui/sonner.tsx";
import MockAuthProvider, {useMockAuth} from "../mocks/context/auth-context";
import {MockThemeProvider} from "../mocks/context/theme-context";
import type {User} from "@/types/auth.ts";

interface RenderWithFileRoutesOptions {
    initialLocation?: string;
    initialAuth?: { user: User | null; isAuthenticated: boolean };
    initialTheme?: 'light' | 'dark' | 'system';
    storageKey?: string;
}

export const testQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            gcTime: 0,
        },
        mutations: {
            retry: false,
        },
    },
});

export function renderWithFileRoutes(
    {
        initialLocation = '/',
        initialAuth = {user: null, isAuthenticated: false},
        initialTheme = 'light',
        storageKey = 'vite-ui-theme',
    }: RenderWithFileRoutesOptions = {},
) {
    let routerInstance: ReturnType<typeof createRouter<typeof routeTree>>;

    const InnerRouterProvider = () => {
        const auth = useMockAuth();

        routerInstance = createRouter({
            routeTree,
            history: createMemoryHistory({
                initialEntries: [initialLocation],
            }),
            context: {
                queryClient: testQueryClient,
                auth,
                getTitle: () => "",
            },
        });

        return <RouterProvider router={routerInstance}/>;
    };

    const TestApp = () => {
        return (
            <QueryClientProvider client={testQueryClient}>
                <MockThemeProvider initialTheme={initialTheme} storageKey={storageKey}>
                    <MockAuthProvider initialValue={initialAuth}>
                        <Toaster/>
                        <InnerRouterProvider/>
                    </MockAuthProvider>
                </MockThemeProvider>
            </QueryClientProvider>
        );
    };

    const renderResult = render(<TestApp/>);

    return {
        ...renderResult,
        get router() {
            return routerInstance!;
        },
    };
}