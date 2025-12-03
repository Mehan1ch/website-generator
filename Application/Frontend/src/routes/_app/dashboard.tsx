import {createFileRoute} from '@tanstack/react-router';
import {RouteTitle} from "@/components/blocks/route-title.tsx";
import {api} from "@/lib/api/api-client.ts";
import {DashboardDataResponse} from "@/types/dashboard.ts";
import {DashboardEmpty} from "@/routes/_app/-components/dashboard-empty.tsx";
import {DashboardStats} from "@/routes/_app/-components/dashboard-stats.tsx";
import {DashboardActivity} from "@/routes/_app/-components/dashboard-activity.tsx";
import {DashboardQuickActions} from "@/routes/_app/-components/dashboard-quick-actions.tsx";

export const Route = createFileRoute('/_app/dashboard')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Dashboard',
        };
    },
    loader: async ({context: {queryClient}}) => {
        const dashboardQueryOptions = api.queryOptions("get", "/api/v1/dashboard", {});
        return queryClient.ensureQueryData(dashboardQueryOptions);
    },
    component: Dashboard,
});

function Dashboard() {
    const {data} = api.useSuspenseQuery("get", "/api/v1/dashboard");
    const dashboardData: DashboardDataResponse = data?.data;

    if (!dashboardData) {
        return <DashboardEmpty/>;
    }
    return (
        <div className="flex flex-col gap-6">
            <RouteTitle
                title={"Dashboard"}
                description={"Welcome to your dashboard. Here you can find an overview of your activities."}
            />
            <DashboardStats data={dashboardData}/>
            <DashboardActivity data={dashboardData}/>
            <DashboardQuickActions/>
        </div>
    );
}
