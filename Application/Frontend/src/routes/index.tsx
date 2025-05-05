import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import "../index.css"
import {createFileRoute} from "@tanstack/react-router";
import {AppSidebar} from "@/components/app-sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export const Route = createFileRoute("/")({
    component: Index
});

function Index() {

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">

                        <Separator orientation="vertical" className="mr-2 h-4"/>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Index
