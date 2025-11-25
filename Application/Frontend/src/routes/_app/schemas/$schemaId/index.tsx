import {createFileRoute, Link, useRouter} from '@tanstack/react-router';
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {SchemaState} from "@/types/schema.ts";
import {useAuth} from "@/hooks/use-auth.tsx";
import {BackLink} from "@/components/blocks/back-link.tsx";
import {StateBadge} from "@/components/blocks/state-badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Edit, Paintbrush} from "lucide-react";
import {DeleteDialog} from "@/components/blocks/delete-dialog.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Preview} from "@/routes/_app/-components/editor/blocks/preview.tsx";
import {getDateString} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {SchemaNotFound} from "@/routes/_app/schemas/$schemaId/-components/schema-not-found.tsx";
import {SchemaPublishDialog} from "@/routes/_app/schemas/$schemaId/-components/schema-publish-dialog.tsx";

export const Route = createFileRoute('/_app/schemas/$schemaId/')({
    beforeLoad: () => {
        return {
            getTitle: () => "View",
        };
    },
    loader: async ({context: {queryClient}, params}) => {
        const {schemaId} = params;
        const schemaQueryOptions = api.queryOptions("get", "/api/v1/schema/{schema_id}", {
            params: {
                path: {
                    schema_id: schemaId,
                }
            }
        });
        return queryClient.ensureQueryData(schemaQueryOptions);
    },
    component: SchemaIndexComponent,
});

function SchemaIndexComponent() {
    const {schemaId} = Route.useParams();
    const {data} = api.useSuspenseQuery("get", "/api/v1/schema/{schema_id}", {
        params: {
            path: {
                schema_id: schemaId,
            }
        }
    });
    const schema = data?.data;
    if (!schema) {
        return <SchemaNotFound/>;
    }
    const router = useRouter();
    const {user} = useAuth();
    const deleteSchemaMutation = api.useMutation("delete", "/api/v1/schema/{schema_id}");
    const publishSchemaMutation = api.useMutation("post", "/api/v1/schema/{schema_id}/publish");

    const onDelete = async () => {
        toast.promise(deleteSchemaMutation.mutateAsync({
                params: {
                    path: {
                        schema_id: schema.id || "",
                    }
                }
            }, {
                onSuccess: () => {
                    router.history.push("/schemas");
                }
            }),
            {
                loading: "Deleting schema...",
                success: "Schema deleted successfully.",
                error: (error: APIError) => {
                    return {message: "Failed to delete schema.", description: error.message};
                }
            });
    };

    const onPublish = async () => {
        toast.promise(publishSchemaMutation.mutateAsync({
            params: {
                path: {
                    schema_id: schema.id || "",
                }
            }
        }), {
            loading: "Publishing schema...",
            success: "Schema published successfully.",
            error: (error: APIError) => {
                return {message: "Failed to publish schema.", description: error.message};
            }
        });
    };

    return <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
            <BackLink text={"Back to Schemas"}/>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="items-center gap-3 mb-2">
                        <h1 className="text-3xl py-2 font-bold truncate text-pretty">{schema.name}</h1>
                        <StateBadge className={"text-md"} state={schema.state as SchemaState}/>
                    </div>
                </div>
                {user?.is_admin &&
                    <div className="flex gap-2">
                        {schema.state as SchemaState === "draft" &&
                            <SchemaPublishDialog name={schema.name || ""} onSubmit={onPublish}/>
                        }
                        <Link to={"/schemas/$schemaId/edit"} params={{schemaId: schema.id || ""}}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4"/>
                                Edit
                            </Button>
                        </Link>
                        <Link to={"/schemas/$schemaId/design"} params={{schemaId: schema.id || ""}}>
                            <Button>
                                <Paintbrush className="mr-2 h-4 w-4"/>
                                Design
                            </Button>
                        </Link>
                        <DeleteDialog name={"schema"} description={"Delete your page schema"}
                                      alertDescription={"Warning this will delete all resources associated with this schema!"}
                                      onSubmit={onDelete}/>
                    </div>
                }
            </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Schema Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div
                        className="p-2 overflow-hidden aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Preview content={schema.content}/>
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-2">Description</p>
                        <p className="text-muted-foreground text-sm">
                            {schema.description || "No description available for this page schema."}
                        </p>
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
                            <p className="font-medium">{getDateString(schema.created_at)}</p>
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-muted-foreground mb-1">Last Modified</p>
                            <p className="font-medium">{getDateString(schema.created_at)}</p>
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-muted-foreground mb-1">Last Published</p>
                            <p className="font-medium">{getDateString(schema.published_at)}</p>
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-muted-foreground mb-1">Schema ID</p>
                            <p className="font-mono text-xs">{schema.id}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>;
}
