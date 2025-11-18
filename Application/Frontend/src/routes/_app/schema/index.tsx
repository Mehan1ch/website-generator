import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/schema/')({
    component: Schemas,
});

function Schemas() {
    return <div>Hello "/_app/schema/"!</div>;
}
