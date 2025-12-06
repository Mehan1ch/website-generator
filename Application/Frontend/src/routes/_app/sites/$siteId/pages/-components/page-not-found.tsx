import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {StickyNote} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";

export const PageNotFound = () => {
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <StickyNote/>
            </EmptyMedia>
            <EmptyTitle>Page not found</EmptyTitle>
            <EmptyDescription>
                The page you are looking for does not exist or has been deleted.
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            <Link to={".."}>
                <Button className="gap-2" variant="link">
                    Go back to Site
                </Button>
            </Link>
        </EmptyContent>
    </Empty>;
};
