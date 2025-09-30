import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/react-query";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {AuthContextType} from "@/types/auth.ts";

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
    notFoundComponent: () => {
        //TODO: better looking 404 page
        return (
            <div>
                <p>This is the notFoundComponent configured on root route</p>
                <Link to="/" search={{redirect: "/"}}>Start Over</Link>
            </div>
        )
    },
})