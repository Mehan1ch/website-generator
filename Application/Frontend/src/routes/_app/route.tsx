import {createFileRoute, Link, Outlet, redirect, useRouterState} from '@tanstack/react-router';
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/routes/_app/-components/app-sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Fragment} from "react";

export const Route = createFileRoute('/_app')({
    beforeLoad: async ({location, context}) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            });
        }
    },

    component: AppLayout,
});

function AppLayout() {

    const matches = useRouterState({select: (s) => s.matches});

    const breadcrumbs = matches
        .filter((match) => match.context.getTitle)
        .map(({pathname, context}) => {
            return {
                title: context.getTitle(),
                path: pathname,
            };
        }).filter((breadcrumb) => breadcrumb.path !== "/");

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
                            <Fragment key={index}>
                                <BreadcrumbItem
                                    className={index === breadcrumbs.length - 1 ? "hidden md:block" : ""}>
                                    <BreadcrumbLink asChild={true}>
                                        <Link to={breadcrumb.path}>
                                            {breadcrumb.title}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {(index < breadcrumbs.length - 1) && <BreadcrumbSeparator className="hidden md:block"/>}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className={"m-4 p-4 space-y-4"}>
                <Outlet/>
            </div>
        </SidebarInset>
    </SidebarProvider>;
}
