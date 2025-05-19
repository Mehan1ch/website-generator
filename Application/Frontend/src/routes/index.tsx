import "../index.css"
import {createFileRoute} from "@tanstack/react-router";
import AppWrapper from "@/components/app-wrapper.tsx";

export const Route = createFileRoute("/")({
    component: Index
});

function Index() {
    return (
        <AppWrapper header={"Dashboard"} link={"/"}>
            <div className="flex flex-1 items-center justify-center">
                <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            </div>
        </AppWrapper>
    )
}

export default Index
