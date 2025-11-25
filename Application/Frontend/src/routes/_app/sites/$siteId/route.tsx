import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites/$siteId')({
    beforeLoad: ({params: {siteId}}) => {
        return {
            getTitle: () => siteId,
        };
    },
    component: WebsiteLayoutComponent,
});

function WebsiteLayoutComponent() {
    return <div>Hello "/_app/websites/$siteId"!</div>;
}
