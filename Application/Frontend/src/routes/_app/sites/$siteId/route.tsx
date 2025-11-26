import {createFileRoute, Outlet} from '@tanstack/react-router';
import {api, APIError} from "@/lib/api/api-client.ts";
import {Loading} from "@/components/blocks/loading.tsx";
import {toast} from "sonner";

export const Route = createFileRoute('/_app/sites/$siteId')({
    beforeLoad: ({params: {siteId}}) => {
        return {
            getTitle: () => siteId,
        };
    },
    loader: async ({context: {queryClient}, params}) => {
        const {siteId} = params;
        const siteQueryOptions = api.queryOptions("get", "/api/v1/site/{site_id}", {
            params: {
                path: {
                    site_id: siteId,
                }
            }
        });
        return queryClient.ensureQueryData(siteQueryOptions);
    },
    component: WebsiteLayoutComponent,
});

function WebsiteLayoutComponent() {
    const {siteId} = Route.useParams();
    const {error, isLoading, data} = api.useSuspenseQuery("get", "/api/v1/site/{site_id}", {
        params: {
            path: {
                site_id: siteId,
            }
        }
    });

    if (error) {
        toast.error("Failed to load site.", {
            description: (error as APIError).message,
        });
        throw error;
    }

    if (!data || isLoading) {
        return <Loading/>;
    }

    return <Outlet/>;
}
