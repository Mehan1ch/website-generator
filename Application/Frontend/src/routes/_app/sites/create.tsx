import {createFileRoute} from '@tanstack/react-router';
import {BackLink} from "@/components/blocks/back-link.tsx";
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {SiteCreateForm} from "@/routes/_app/sites/-components/site-create-form.tsx";

export const Route = createFileRoute('/_app/sites/create')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Create',
        };
    },
    component: SiteCreateComponent,
});

function SiteCreateComponent() {
    return <div className="mb-8">
        <BackLink text={"Back to Sites"}/>
        <RouteTitle title={"Create Site"} description={"Enter the details of your new website"}/>
        <SiteCreateForm/>
    </div>;
}
