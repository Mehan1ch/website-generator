import {createFileRoute, Link, useRouter} from '@tanstack/react-router';
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {getDateString} from "@/lib/utils.ts";
import {PageNotFound} from "../-components/page-not-found";
import {BackLink} from "@/components/blocks/back-link";
import {Page} from "@/types/pages";
import {Button} from "@/components/ui/button";
import {Edit, Paintbrush} from "lucide-react";
import {DeleteDialog} from "@/components/blocks/delete-dialog.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Preview} from "@/routes/_app/-components/editor/blocks/preview.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export const Route = createFileRoute('/_app/sites/$siteId/pages/$pageId/')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Index',
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
    component: PageIndexComponent,
});

function PageIndexComponent() {
    const {siteId, pageId} = Route.useParams();
    const {data} = api.useSuspenseQuery("get", "/api/v1/site/{site_id}/page/{page_id}", {
        params: {
            path: {
                site_id: siteId,
                page_id: pageId,
            }
        }
    });
    const page: Page | undefined = data?.data;
    if (!page) {
        return <PageNotFound/>;
    }


    const router = useRouter();
    const deletePageMutation = api.useMutation("delete", "/api/v1/site/{site_id}/page/{page_id}");

    const onDelete = async () => {
        toast.promise(deletePageMutation.mutateAsync({
                params: {
                    path: {
                        site_id: siteId,
                        page_id: pageId,
                    }
                }
            }, {
                onSuccess: () => {
                    router.history.back();
                }
            }),
            {
                loading: "Deleting Page...",
                success: "Page deleted successfully.",
                error: (error: APIError) => {
                    return {message: "Failed to delete page.", description: error.message};
                }
            });
    };


    return <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
            <BackLink text={"Back to Site"}/>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="items-center gap-3 mb-2">
                        <h1 className="text-3xl py-2 font-bold truncate text-pretty">{page.title}</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link to={"/sites/$siteId/pages/$pageId/edit"} params={{pageId: pageId, siteId: siteId}}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                        </Button>
                    </Link>
                    <Link to={"/sites/$siteId/pages/$pageId/design"} params={{pageId: pageId, siteId: siteId}}>
                        <Button>
                            <Paintbrush className="mr-2 h-4 w-4"/>
                            Design
                        </Button>
                    </Link>
                    {page.url !== "/" &&
                        <DeleteDialog name={"page"} description={"Delete your page"}
                                      alertDescription={"Warning this will delete all resources associated with this page!"}
                                      onSubmit={onDelete}/>}
                </div>
            </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Page Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div
                        className="p-2 overflow-hidden aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Preview content={page.content}/>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div>
                            <p className="text-muted-foreground mb-1">Created</p>
                            <p className="font-medium">{getDateString(page.created_at)}</p>
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-muted-foreground mb-1">Last Modified</p>
                            <p className="font-medium">{getDateString(page.created_at)}</p>
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-muted-foreground mb-1">Page ID</p>
                            <p className="font-mono text-xs">{page.id}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>;
}
