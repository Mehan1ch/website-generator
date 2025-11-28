import {createFileRoute, Outlet} from '@tanstack/react-router';
import {api} from "@/lib/api/api-client.ts";
import {PageNotFound} from "@/routes/_app/sites/$siteId/pages/-components/page-not-found.tsx";

export const Route = createFileRoute('/_app/sites/$siteId/pages/$pageId')({
    beforeLoad: ({params: {pageId}}) => {
        return {
            getTitle: () => pageId,
        };
    },
    loader: async ({context: {queryClient}, params}) => {
        const {siteId, pageId} = params;
        const pageQueryOptions = api.queryOptions("get", "/api/v1/site/{site_id}/page/{page_id}", {
            params: {
                path: {
                    site_id: siteId,
                    page_id: pageId,
                }
            }
        });
        return queryClient.ensureQueryData(pageQueryOptions);
    },
    errorComponent: PageNotFound,
    component: PageLayoutComponent,
});

function PageLayoutComponent() {
    const {siteId, pageId} = Route.useParams();
    api.useSuspenseQuery("get", "/api/v1/site/{site_id}/page/{page_id}", {
        params: {
            path: {
                site_id: siteId,
                page_id: pageId,
            }
        }
    });

    return <Outlet/>;
}
