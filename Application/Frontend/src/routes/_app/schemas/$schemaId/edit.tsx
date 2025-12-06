import {createFileRoute, redirect} from '@tanstack/react-router';
import {toast} from "sonner";
import {BackLink} from "@/components/blocks/back-link.tsx";
import {SchemaEditForm} from "@/routes/_app/schemas/$schemaId/-components/schema-edit-form.tsx";
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {SchemaNotFound} from "@/routes/_app/schemas/$schemaId/-components/schema-not-found.tsx";
import {api} from "@/lib/api/api-client.ts";

export const Route = createFileRoute('/_app/schemas/$schemaId/edit')({
    beforeLoad: ({context: {auth}}) => {
        if (!auth.user?.is_admin) {
            toast.warning("You do not have permission to edit schemas.");
            throw redirect({
                to: '/schemas',
            });
        }
        return {
            getTitle: () => 'Edit',
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
    component: SchemaEditComponent,
});

function SchemaEditComponent() {
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

    return <div className="mb-8">
        <BackLink text={"Back to Schema"}/>
        <RouteTitle title={"Edit Schema"} description={"Edit the details of your schema"}/>
        <SchemaEditForm schema={schema}/>
    </div>;
}
