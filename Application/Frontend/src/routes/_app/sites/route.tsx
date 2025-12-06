import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {toast} from "sonner";

export const Route = createFileRoute('/_app/sites')({
    beforeLoad: ({context: {auth: {user}}}) => {
        if (!user?.email_verified_at) {
            toast.error("Please verify your email address to access schemas.");
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            });
        }
        return {
            getTitle: () => 'Sites',
        };
    },
    component: SitesLayout,
});

function SitesLayout() {
    return <Outlet/>;
}
