import {createFileRoute, Outlet, redirect, useRouterState} from '@tanstack/react-router'
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar/app/app-sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

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

    const breadcrumbs = matches
        .filter((match) => match.context.getTitle)
        .map(({pathname, context}) => {
            return {
                title: context.getTitle(),
                path: pathname,
            }
        }).filter((breadcrumb) => breadcrumb.path !== "/")

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
                        {breadcrumbs.map((breadcrumb, index) => (
                            <>
                                <BreadcrumbItem key={index}
                                                className={index === breadcrumbs.length - 1 ? "hidden md:block" : ""}>
                                    <BreadcrumbLink href={breadcrumb.path}>
                                        {breadcrumb.title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {(index < breadcrumbs.length - 1) && <BreadcrumbSeparator className="hidden md:block"/>}
                            </>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div>
                <Outlet/>
            </div>
        </SidebarInset>
    </SidebarProvider>
}
