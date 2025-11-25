import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites/$siteId/edit')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Edit',
        };
    },
    component: WebsiteEditComponent,
});

function WebsiteEditComponent() {
    return <div>Hello "/_app/websites/$siteId/edit"!</div>;
}
