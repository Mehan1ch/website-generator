import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {QueryClient} from "@tanstack/react-query";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {AuthContextType} from "@/types/auth.ts";
import {NotFoundRouteComponent} from "@/components/blocks/not-found.tsx";

interface RouterContext {
    queryClient: QueryClient,
    auth: AuthContextType,
    getTitle: () => string,
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <>
            <Outlet/>
            <TanStackRouterDevtools position={"bottom-right"}/>
        </>
    ),
    notFoundComponent: () => <NotFoundRouteComponent/>
});