import {createFileRoute, redirect} from '@tanstack/react-router';
import {PageDesigner} from "@/routes/_app/-components/editor/page-designer.tsx";
import {toast} from "sonner";
import {decodeBase64AndDecompress} from "@/lib/utils.ts";
import {api, APIError} from "@/lib/api/api-client.ts";
import {SchemaNotFound} from "@/routes/_app/schemas/$schemaId/-components/schema-not-found.tsx";

export const Route = createFileRoute('/_app/schemas/$schemaId/design')({
    beforeLoad: ({context: {auth}}) => {
        if (!auth.user?.is_admin) {
            toast.warning("You do not have permission to design schemas.");
            throw redirect({
                to: '/schemas',
            });
        }
        return {
            getTitle: () => 'Design',
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
    component: SchemaDesignComponent,
});

function SchemaDesignComponent() {
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

    const updateSchemaMutation = api.useMutation("put", "/api/v1/schema/{schema_id}");
    const decoded = decodeBase64AndDecompress(schema?.content || "");

    const onSave = (content: string) => {
        toast.promise(updateSchemaMutation.mutateAsync({
            params: {
                path: {
                    schema_id: schema.id || "",
                }
            },
            body: {
                name: schema.name || "",
                description: schema.description || "",
                content: content,
            }
        }), {
            loading: "Saving schema design...",
            success: "Schema design saved successfully!",
            error: (error: APIError) => {
                return {
                    message: "Failed to save schema design.",
                    description: error.message,
                };
            }
        });
    };

    return <PageDesigner content={decoded} onSave={onSave}></PageDesigner>;
}