import {createFileRoute} from '@tanstack/react-router';
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {Loading} from "@/components/blocks/loading.tsx";
import SchemaDetail from "@/routes/_app/schemas/-components/schema-detail.tsx";
import {Schema} from "@/types/schema.ts";

export const Route = createFileRoute('/_app/schemas/$schemaId/')({
    beforeLoad: ({params}) => {
        return {
            getTitle: () => `${params.schemaId}`,
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
    component: SchemaRoute,
});

function SchemaRoute() {
    const {schemaId} = Route.useParams();
    const {error, isLoading, data} = api.useQuery("get", "/api/v1/schema/{schema_id}", {
        params: {
            path: {
                schema_id: schemaId,
            }
        }
    });

    if (error) {
        toast.error("Failed to load schemas.", {
            description: (error as APIError).message,
        });
        throw error;
    }

    if (!data || isLoading) {
        return <Loading/>;
    }

    const schema = data.data as Schema;
    return <SchemaDetail schema={schema}/>;
}
