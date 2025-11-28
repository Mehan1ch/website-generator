import {createFileRoute} from '@tanstack/react-router';
import {BackLink} from "@/components/blocks/back-link.tsx";
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {PageCreateForm} from "@/routes/_app/sites/$siteId/pages/-components/page-create-form.tsx";

export const Route = createFileRoute('/_app/sites/$siteId/pages/create')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Create',
        };
    },
    component: PageCreateComponent,
});

function PageCreateComponent() {
    const {siteId} = Route.useParams();
    return <div className="mb-8">
        <BackLink text={"Back to Site"}/>
        <RouteTitle title={"Create Page"} description={"Enter the details of your new page"}/>
        <PageCreateForm siteId={siteId}/>
    </div>;
}
