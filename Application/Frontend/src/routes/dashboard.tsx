import {createFileRoute, redirect} from '@tanstack/react-router'
import AppWrapper from "@/components/sidebar/app-wrapper.tsx";

export const Route = createFileRoute('/dashboard')({
    beforeLoad: ({context}) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({to: "/login"})
        }
    },
    component: Dashboard,
})

function Dashboard() {
    return (
        <AppWrapper header={"Dashboard"} link={"/dashboard"}>
            <div className="flex flex-1 items-center justify-center">
                <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            </div>
        </AppWrapper>
    );
}
