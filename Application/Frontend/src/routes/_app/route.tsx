import {createFileRoute, Outlet, redirect, useRouterState} from '@tanstack/react-router'
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar/app/app-sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "@/components/ui/breadcrumb.tsx";

export const Route = createFileRoute('/_app')({
    beforeLoad: async ({location, context}) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },

    component: AppLayout,
})

function AppLayout() {

    const matches = useRouterState({select: (s) => s.matches})

    const matchWithTitle = [...matches]
        .reverse()
        .find((d) => d.context.getTitle)

    const title = matchWithTitle?.context.getTitle() || 'My App'
    const path = matchWithTitle?.pathname || '/'


    return <SidebarProvider name={"App"}>
        <AppSidebar/>
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1"/>
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"/>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={path}>
                                {title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div>
                <Outlet/>
            </div>
        </SidebarInset>
    </SidebarProvider>
}
