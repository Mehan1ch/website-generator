import {createFileRoute} from '@tanstack/react-router';
import {BackLink} from "@/components/blocks/back-link.tsx";
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {PageCreateForm} from "@/routes/_app/sites/$siteId/pages/-components/create-form/page-create-form.tsx";
import {z} from "zod";


const pageSchemasSearchSchema = z.object({
    page: z.number().min(1).default(1),
});

export const Route = createFileRoute('/_app/sites/$siteId/pages/create')({
    validateSearch: pageSchemasSearchSchema,
    beforeLoad: () => {
        return {
            getTitle: () => 'Create',
        };
    },
    component: PageCreateComponent,
});


function PageCreateComponent() {
    const {siteId} = Route.useParams();
    const {page} = Route.useSearch();
    return <div className="mb-8">
        <BackLink text={"Back to Site"}/>
        <RouteTitle title={"Create Page"} description={"Enter the details of your new page"}/>
        <PageCreateForm siteId={siteId} page={page}/>
    </div>;
}
