import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites/$siteId/')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Index',
        };
    },
    component: WebsiteIndexComponent,
});

function WebsiteIndexComponent() {
    return <div>Hello "/_app/websites/$siteId/"!</div>;
}
