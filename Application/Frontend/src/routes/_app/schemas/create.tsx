import {createFileRoute, redirect} from '@tanstack/react-router';
import {toast} from "sonner";
import {BackLink} from "@/components/blocks/back-link.tsx";
import {SchemaCreateForm} from "@/routes/_app/schemas/-components/schema-create-form.tsx";
import {RouteTitle} from "@/components/blocks/route-title.tsx";

export const Route = createFileRoute('/_app/schemas/create')({
    beforeLoad: ({context: {auth}}) => {
        if (!auth.user?.is_admin) {
            toast.warning("You do not have permission to create schemas.");
            throw redirect({
                to: '/schemas',
            });
        }
        return {
            getTitle: () => 'Create',
        };
    },
    component: SchemaCreate,
});

function SchemaCreate() {
    return <div className="mb-8">
        <BackLink text={"Back to Schemas"}/>
        <RouteTitle title={"Create Schema"} description={"Enter the details of your new schema"}/>
        <SchemaCreateForm/>
    </div>;
}
