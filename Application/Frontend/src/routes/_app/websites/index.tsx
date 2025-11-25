import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/websites/')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Index',
        };
    },
    component: WebsitesIndexComponent,
});

function WebsitesIndexComponent() {
    return <div>Hello "/_app/websites/"!</div>;
}
