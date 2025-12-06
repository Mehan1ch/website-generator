import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {QueryClient} from "@tanstack/react-query";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {AuthContextType} from "@/types/auth.ts";
import {NotFoundRouteComponent} from "@/components/blocks/not-found.tsx";
import {ErrorBoundary} from "@/components/blocks/error-boundary.tsx";
import {Loading} from "@/components/blocks/loading.tsx";

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
    pendingComponent: Loading,
    notFoundComponent: () => <NotFoundRouteComponent/>,
    errorComponent: ({error}) => <ErrorBoundary error={error}/>
});