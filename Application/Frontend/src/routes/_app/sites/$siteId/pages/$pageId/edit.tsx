import {createFileRoute} from '@tanstack/react-router';
import {api} from "@/lib/api/api-client.ts";
import {BackLink} from "@/components/blocks/back-link.tsx";
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {PageNotFound} from "@/routes/_app/sites/$siteId/pages/-components/page-not-found.tsx";
import {PageEditForm} from "@/routes/_app/sites/$siteId/pages/$pageId/-components/page-edit-form.tsx";

export const Route = createFileRoute(
    '/_app/sites/$siteId/pages/$pageId/edit',
)({
    beforeLoad: () => {
        return {
            getTitle: () => 'Edit',
        };
    },
    loader: async ({context: {queryClient}, params}) => {
        const {siteId, pageId} = params;
        const siteQueryOptions = api.queryOptions("get", "/api/v1/site/{site_id}/page/{page_id}", {
            params: {
                path: {
                    site_id: siteId,
                    page_id: pageId,
                }
            }
        });
        return queryClient.ensureQueryData(siteQueryOptions);
    },
    component: PageEditComponent,
});

function PageEditComponent() {
    const {siteId, pageId} = Route.useParams();
    const {data} = api.useSuspenseQuery("get", "/api/v1/site/{site_id}/page/{page_id}", {
        params: {
            path: {
                site_id: siteId,
                page_id: pageId,
            }
        }
    });
    const page = data?.data;
    if (!page) {
        return <PageNotFound/>;
    }

    return <div className="mb-8">
        <BackLink text={"Back to Site"}/>
        <RouteTitle title={"Edit Page"} description={"Edit the details of your page"}/>
        <PageEditForm page={page} site_id={siteId}/>
    </div>;
}
