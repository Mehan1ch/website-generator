import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Sites',
        };
    },
    component: SitesLayout,
});

function SitesLayout() {
    return <Outlet/>;
}
