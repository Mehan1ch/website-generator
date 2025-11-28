import {createFileRoute, Link} from '@tanstack/react-router';
import {api, APIError} from "@/lib/api/api-client.ts";
import {z} from "zod";
import {toast} from "sonner";
import {Loading} from "@/components/blocks/loading.tsx";
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {PaginationDynamic} from "@/components/blocks/pagination-dynamic.tsx";
import {SiteCollectionItem, SiteCollectionResponse} from "@/types/site.ts";
import {SiteCard} from "@/routes/_app/sites/-components/site-card.tsx";
import {SiteEmpty} from "@/routes/_app/sites/-components/site-empty.tsx";

const websitesSearchSchema = z.object({
    page: z.number().min(1).default(1),
});
export const Route = createFileRoute('/_app/sites/')({
    validateSearch: websitesSearchSchema,
    beforeLoad: () => {
        return {
            getTitle: () => 'Index',
        };
    },
    loaderDeps: ({search: {page}}) => ({page}),
    loader: async ({context: {queryClient}, deps}) => {
        const {page} = deps;
        const schemaIndexQueryOptions = api.queryOptions("get", "/api/v1/site", {
            params: {
                query: {
                    page: page,
                }
            }
        });
        return queryClient.ensureQueryData(schemaIndexQueryOptions);
    },
    component: SitesIndexComponent,
});

function SitesIndexComponent() {
    const {page} = Route.useSearch();
    const {error, isLoading, data} = api.useSuspenseQuery("get", "/api/v1/site", {
        params: {
            query: {
                page: page,
            }
        }
    });


    if (error) {
        toast.error("Failed to load sites.", {
            description: (error as APIError).message,
        });
        throw error;
    }

    if (!data || isLoading) {
        return <Loading/>;
    }

    const siteCollectionResponse: SiteCollectionResponse = data;
    const sites: SiteCollectionItem[] = siteCollectionResponse?.data || [];
    if (sites?.length > 0) {
        return <>
            <div className="mb-8 flex items-center justify-between">
                <RouteTitle title={"Sites"} description={"View your websites"} className={"mb-0"}/>
                <Link to={"/sites/create"}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4"/>
                        New Site
                    </Button>
                </Link>
            </div>
            <div className={"grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"}>
                {sites.map(site => {
                    return (<SiteCard key={site.id} page={site}/>);
                })}
            </div>
            <PaginationDynamic currentPage={siteCollectionResponse.meta?.current_page}
                               lastPage={siteCollectionResponse.meta?.last_page}/>
        </>;
    } else {
        return <div className={"flex w-full min-h-screen items-center justify-center"}>
            <SiteEmpty/>
        </div>;
    }
}
