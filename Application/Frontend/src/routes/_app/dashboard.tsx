import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Dashboard',
        }
    },
    component: Dashboard,
})

function Dashboard() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        </div>
    );
}
