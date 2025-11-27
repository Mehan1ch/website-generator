import {createFileRoute} from '@tanstack/react-router';
import {api} from "@/lib/api/api-client.ts";
import {BackLink} from "@/components/blocks/back-link.tsx";
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {SiteNotFound} from "@/routes/_app/sites/$siteId/-components/site-not-found.tsx";
import {SiteEditForm} from "@/routes/_app/sites/$siteId/-components/site-edit-form.tsx";

export const Route = createFileRoute('/_app/sites/$siteId/edit')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Edit',
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
    component: WebsiteEditComponent,
});

function WebsiteEditComponent() {
    const {siteId} = Route.useParams();
    const {data} = api.useSuspenseQuery("get", "/api/v1/site/{site_id}", {
        params: {
            path: {
                site_id: siteId,
            }
        }
    });
    const site = data?.data;
    if (!site) {
        return <SiteNotFound/>;
    }

    return <div className="mb-8">
        <BackLink text={"Back to Site"}/>
        <RouteTitle title={"Edit Site"} description={"Edit the details of your site"}/>
        <SiteEditForm site={site}/>
    </div>;
}
