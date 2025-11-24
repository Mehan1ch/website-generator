import {createFileRoute, Link} from '@tanstack/react-router';
import {SchemaEmpty} from "@/routes/_app/schemas/-components/schema-empty.tsx";
import {useAuth} from "@/hooks/use-auth.tsx";
import {api, APIError} from "@/lib/api/api-client.ts";
import {SchemaCollectionItem, SchemaCollectionResponse} from "@/types/schema.ts";
import {SchemaCard} from "@/routes/_app/schemas/-components/schema-card.tsx";
import {Loading} from "@/components/blocks/loading.tsx";
import {PaginationDynamic} from "@/components/blocks/pagination-dynamic.tsx";
import {toast} from "sonner";
import {z} from "zod";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {RouteTitle} from "@/components/blocks/route-title.tsx";

const schemasSearchSchema = z.object({
    page: z.number().min(1).default(1),
});
export const Route = createFileRoute('/_app/schemas/')({
    validateSearch: schemasSearchSchema,
    beforeLoad: () => {
        return {
            getTitle: () => 'Index',
        };
    },
    loaderDeps: ({search: {page}}) => ({page}),
    loader: async ({context: {queryClient}, deps}) => {
        const {page} = deps;
        const schemaIndexQueryOptions = api.queryOptions("get", "/api/v1/schema", {
            params: {
                query: {
                    page: page,
                }
            }
        });
        return queryClient.ensureQueryData(schemaIndexQueryOptions);
    },
    component: SchemaIndexRoute,
});

function SchemaIndexRoute() {
    const {user} = useAuth();
    const {page} = Route.useSearch();
    const {error, isLoading, data} = api.useQuery("get", "/api/v1/schema", {
        params: {
            query: {
                page: page,
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

    const schemaCollectionResponse: SchemaCollectionResponse = data;
    const schemas: SchemaCollectionItem[] = schemaCollectionResponse?.data || [];
    if (schemas?.length > 0) {
        return <>
            <div className="mb-8 flex items-center justify-between">
                <RouteTitle title={"Schemas"} description={"Browse schemas for your pages"} className={"mb-0"}/>
                {user?.is_admin &&
                    <Link to={"/schemas/create"}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4"/>
                            New Schema
                        </Button>
                    </Link>
                }
            </div>
            <div className={"grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"}>
                {schemas.map(schema => {
                    return (<SchemaCard key={schema.id} schema={schema}/>);
                })}
            </div>
            <PaginationDynamic currentPage={schemaCollectionResponse.meta?.current_page}
                               lastPage={schemaCollectionResponse.meta?.last_page}/>
        </>;
    } else {
        return <div className={"flex w-full min-h-screen items-center justify-center"}>
            <SchemaEmpty is_admin={user?.is_admin}/>
        </div>;
    }
}
