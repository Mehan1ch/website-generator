import {createFileRoute} from '@tanstack/react-router';
import {RouteTitle} from "@/components/blocks/route-title.tsx";

export const Route = createFileRoute('/_app/dashboard')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Dashboard',
        };
    },
    component: Dashboard,
});

function Dashboard() {
    return (
        <RouteTitle title={"Dashboard"}
                    description={"Welcome to your dashboard. Here you can find an overview of your activities."}/>

    );
}
