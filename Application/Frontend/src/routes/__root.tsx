import {createRootRouteWithContext, Link} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/react-query";
import Index from "./index.tsx";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: Index,
    notFoundComponent: () => {
        return (
            <div>
                <p>This is the notFoundComponent configured on root route</p>
                <Link to="/">Start Over</Link>
            </div>
        )
    },
})