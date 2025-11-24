import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/schemas')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Schemas',
        };
    },
    component: SchemasLayout,
});

function SchemasLayout() {
    return <Outlet/>;
}
