import {createFileRoute, redirect} from '@tanstack/react-router';
import {toast} from "sonner";

export const Route = createFileRoute('/_app/schemas/create')({
    beforeLoad: ({context: {auth}}) => {
        if (!auth.user?.is_admin) {
            toast.warning("You do not have permission to create schemas.");
            throw redirect({
                to: '/schemas',
            });
        }
        return {
            getTitle: () => 'Create Schema',
        };
    },
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/_app/schemas/create"!</div>;
}
