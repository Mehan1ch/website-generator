import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites/$siteId/pages/$pageId/')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Index',
        };
    },
    component: PageIndexComponent,
});

function PageIndexComponent() {
    return <div>Hello "/_app/websites/$siteId/pages/$pageId/"!</div>;
}
