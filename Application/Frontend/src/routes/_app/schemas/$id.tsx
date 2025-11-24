import {createFileRoute} from '@tanstack/react-router';
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {Loading} from "@/components/blocks/loading.tsx";
import SchemaDetail from "@/routes/_app/schemas/-components/schema-detail.tsx";
import {Schema} from "@/types/schema.ts";

export const Route = createFileRoute('/_app/schemas/$id')({
    beforeLoad: ({params}) => {
        return {
            getTitle: () => `${params.id}`,
        };
    },
    loader: async ({context: {queryClient}, params}) => {
        const {id} = params;
        const schemaQueryOptions = api.queryOptions("get", "/api/v1/schema/{schema_id}", {
            params: {
                path: {
                    schema_id: id,
                }
            }
        });
        return queryClient.ensureQueryData(schemaQueryOptions);
    },
    component: SchemaRoute,
});

function SchemaRoute() {
    const {id} = Route.useParams();
    const {error, isLoading, data} = api.useSuspenseQuery("get", "/api/v1/schema/{schema_id}", {
        params: {
            path: {
                schema_id: id,
            }
        }
    });
    const schema = data.data as Schema;

    if (error) {
        toast.error("Failed to load schemas.", {
            description: (error as APIError).message,
        });
        throw error;
    }

    if (isLoading) {
        return <Loading/>;
    }

    return <SchemaDetail schema={schema}/>;
}
