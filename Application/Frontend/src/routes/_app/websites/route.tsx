import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/websites')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Websites',
        };
    },
    component: WebsitesLayout,
});

function WebsitesLayout() {
    return <Outlet/>;
}
