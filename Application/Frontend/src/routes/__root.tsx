import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/react-query";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {AuthContextType} from "@/types/auth.ts";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient,
    auth: AuthContextType,
}>()({
    component: () => (
        <>
            <Outlet/>
            <TanStackRouterDevtools position={"top-right"}/>
        </>
    ),
    notFoundComponent: () => {
        return (
            <div>
                <p>This is the notFoundComponent configured on root route</p>
                <Link to="/">Start Over</Link>
            </div>
        )
    },
})