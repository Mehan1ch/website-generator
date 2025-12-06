import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites/$siteId/pages')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Pages',
        };
    },
    component: PagesLayoutComponent,
});

function PagesLayoutComponent() {
    return <Outlet/>;
}
