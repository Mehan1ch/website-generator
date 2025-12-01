import {createFileRoute, Link, useRouter} from '@tanstack/react-router';
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {SiteNotFound} from "./-components/site-not-found";
import {BackLink} from "@/components/blocks/back-link.tsx";
import {StateBadge} from "@/components/blocks/state-badge.tsx";
import {SiteState} from "@/types/site.ts";
import {Button} from "@/components/ui/button.tsx";
import {Edit} from "lucide-react";
import {DeleteDialog} from "@/components/blocks/delete-dialog.tsx";
import {Tabs, TabsContent, TabsContents, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {SiteOverview} from "@/routes/_app/sites/$siteId/-components/site-overview.tsx";
import {z} from "zod";
import {SitePages} from "@/routes/_app/sites/$siteId/-components/site-pages.tsx";
import {SiteDeployDropdown} from "@/routes/_app/sites/$siteId/-components/site-deploy-dropdown.tsx";


const sitePagesSearchSchema = z.object({
    page: z.number().min(1).default(1),
});

export const Route = createFileRoute('/_app/sites/$siteId/')({
    validateSearch: sitePagesSearchSchema,
    beforeLoad: () => {
        return {
            getTitle: () => 'Index',
        };
    },
    loaderDeps: ({search: {page}}) => ({page}),
    loader: async ({context: {queryClient}, params, deps}) => {
        const {siteId} = params;
        const {page} = deps;
        const siteQueryOptions = api.queryOptions("get", "/api/v1/site/{site_id}", {
            params: {
                path: {
                    site_id: siteId,
                }
            }
        });
        const sitePagesQueryOptions = api.queryOptions("get", "/api/v1/site/{site_id}/page", {
            params: {
                query: {
                    page: page,
                },
                path: {
                    site_id: siteId,
                }
            }
        });
        await queryClient.ensureQueryData(sitePagesQueryOptions);
        return queryClient.ensureQueryData(siteQueryOptions);
    },
    component: WebsiteIndexComponent,
});

function WebsiteIndexComponent() {
    const {siteId} = Route.useParams();
    const {page} = Route.useSearch();
    const siteData = api.useSuspenseQuery("get", "/api/v1/site/{site_id}", {
        params: {
            path: {
                site_id: siteId,
            }
        }
    });
    const site = siteData?.data?.data;
    if (!site) {
        return <SiteNotFound/>;
    }

    const sitePagesData = api.useSuspenseQuery("get", "/api/v1/site/{site_id}/page", {
        params: {
            query: {
                page: page,
            },
            path: {
                site_id: siteId,
            }
        }
    });
    const sitePages = sitePagesData?.data;
    const router = useRouter();
    const deleteSiteMutation = api.useMutation("delete", "/api/v1/site/{site_id}");

    const onDelete = async () => {
        toast.promise(deleteSiteMutation.mutateAsync({
                params: {
                    path: {
                        site_id: site.id || "",
                    }
                }
            }, {
                onSuccess: () => {
                    router.history.push("/sites");
                }
            }),
            {
                loading: "Deleting site...",
                success: "Site deleted successfully.",
                error: (error: APIError) => {
                    return {message: "Failed to delete site.", description: error.message};
                }
            });
    };

    return <div className="container">
        <div className="mb-8">
            <BackLink text={"Back to Sites"}/>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="items-center gap-3 mb-2">
                        <h1 className="text-3xl py-2 font-bold truncate text-pretty">{site.name}</h1>
                        <StateBadge className={"text-md"} state={site.state as SiteState}/>
                    </div>
                </div>
                <div className="flex gap-2">
                    <SiteDeployDropdown site={site}/>
                    <Link to={"/sites/$siteId/edit"} params={{siteId: site.id || ""}}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                        </Button>
                    </Link>
                    <DeleteDialog name={"site"} description={"Delete your site"}
                                  alertDescription={"Warning this will delete all resources associated with this site!"}
                                  alertDescriptionItems={["All pages associated with this site will be deleted.", "All deployments associated with this site will be deleted."]}
                                  onSubmit={onDelete}/>
                </div>
            </div>
        </div>
        <Tabs>
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
            </TabsList>
            <TabsContents className={"h-full w-full flex flex-col"}>
                <TabsContent value="overview">
                    <SiteOverview site={site}/>
                </TabsContent>
                <TabsContent value="pages">
                    <SitePages pageCollectionResponse={sitePages} siteId={site.id || ""}/>
                </TabsContent>
            </TabsContents>
        </Tabs>
    </div>;
}
