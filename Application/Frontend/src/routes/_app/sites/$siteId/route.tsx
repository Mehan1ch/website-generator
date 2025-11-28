import {createFileRoute, Outlet} from '@tanstack/react-router';
import {api} from "@/lib/api/api-client.ts";

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
    api.useSuspenseQuery("get", "/api/v1/site/{site_id}", {
        params: {
            path: {
                site_id: siteId,
            }
        }
    });

    return <Outlet/>;
}
