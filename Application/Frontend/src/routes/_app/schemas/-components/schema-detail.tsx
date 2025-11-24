"use client";

import {Edit, Paintbrush} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {BackLink} from "@/components/blocks/back-link.tsx";
import {Schema} from "@/types/schema.ts";
import {capitalize, getStateBadgeVariant} from "@/lib/utils.ts";
import {SchemaState} from "@/types/state.ts";
import {SchemaDetailOverview} from "@/routes/_app/schemas/-components/schema-detail-overview.tsx";
import {Link, useRouter} from "@tanstack/react-router";
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {DeleteDialog} from "@/components/blocks/delete-dialog.tsx";
import {useAuth} from "@/hooks/use-auth.tsx";

type SchemaDetailProps = {
    schema: Schema
}

export default function SchemaDetail({schema}: SchemaDetailProps) {
    const router = useRouter();
    const {user} = useAuth();
    const deleteSchemaMutation = api.useMutation("delete", "/api/v1/schema/{schema_id}");

    const onDelete = async () => {
        const loadingToast = toast.loading("Deleting schema...");
        deleteSchemaMutation.mutate({
            params: {
                path: {
                    schema_id: schema.id || "",
                }
            }
        }, {
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success("Schema deleted successfully.");
                router.history.push("/schemas");
            }, onError: (err: APIError) => {
                toast.dismiss(loadingToast);
                toast.error("Failed to delete schema.", {
                    description: err.message,
                });
            }
        });
    };

    return <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
            <BackLink text={"Back to Schemas"}/>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{schema.name}</h1>
                        <Badge
                            variant={getStateBadgeVariant(schema.state as SchemaState)}>{capitalize(schema.state || "")}</Badge>
                    </div>
                    <p className="text-muted-foreground">
                        {schema.description}
                    </p>
                </div>
                {user?.is_admin &&
                    <div className="flex gap-2">

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
        <SchemaDetailOverview schema={schema}/>
    </div>;
}
