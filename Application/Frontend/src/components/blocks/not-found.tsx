import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {CircleOff} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

export function NotFoundRouteComponent() {
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <CircleOff/>
                    </EmptyMedia>
                    <EmptyTitle>404 - Not Found</EmptyTitle>
                    <EmptyDescription>
                        The page you're looking for doesn't exist.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Link to={"/"} search={{redirect: "/"}}>
                        <Button variant="link">
                            Back to Home
                        </Button>
                    </Link>
                </EmptyContent>
            </Empty>
        </div>
    );
}