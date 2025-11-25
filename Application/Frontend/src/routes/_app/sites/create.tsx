import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites/create')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Create',
        };
    },
    component: SiteCreateComponent,
});

function SiteCreateComponent() {
    return <div>Hello "/_app/websites/create"!</div>;
}
