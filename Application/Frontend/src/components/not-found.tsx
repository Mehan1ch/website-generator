import {Empty, EmptyDescription, EmptyHeader, EmptyTitle} from "@/components/ui/empty.tsx";

export function NotFoundRouteComponent() {
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <Empty>
                <EmptyHeader>
                    <EmptyTitle>404 - Not Found</EmptyTitle>
                    <EmptyDescription>
                        The page you're looking for doesn't exist.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    );
}