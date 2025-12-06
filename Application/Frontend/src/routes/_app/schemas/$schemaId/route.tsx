import {createFileRoute, Outlet} from '@tanstack/react-router';
import {api} from "@/lib/api/api-client.ts";

export const Route = createFileRoute('/_app/schemas/$schemaId')({
    beforeLoad: ({params: {schemaId}}) => {
        return {
            getTitle: () => schemaId,
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
    component: SchemaLayout,
});

function SchemaLayout() {
    const {schemaId} = Route.useParams();
    api.useSuspenseQuery("get", "/api/v1/schema/{schema_id}", {
        params: {
            path: {
                schema_id: schemaId,
            }
        }
    });

    return <Outlet/>;
}
