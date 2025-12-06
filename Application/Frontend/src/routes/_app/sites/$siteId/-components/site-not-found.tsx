import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {Globe} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";

export const SiteNotFound = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Globe/>
                </EmptyMedia>
                <EmptyTitle>Site not found</EmptyTitle>
                <EmptyDescription>
                    The site you are looking for does not exist or has been deleted.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Link to={"/sites"}>
                    <Button className="gap-2" variant="link">
                        Go back to Sites.
                    </Button>
                </Link>
            </EmptyContent>
        </Empty>);
};