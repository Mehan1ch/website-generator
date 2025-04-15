import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/react-query";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: () => (
        <>
            <Outlet/>
            <TanStackRouterDevtools/>
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