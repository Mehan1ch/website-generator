import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {Globe, Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

type SchemaEmptyProps = {
    className?: string;
}

export const SiteEmpty = ({className}: SchemaEmptyProps) => {
    return <Empty>
        <EmptyHeader className={className}>
            <EmptyMedia variant="icon">
                <Globe/>
            </EmptyMedia>
            <EmptyTitle>No sites yet</EmptyTitle>
            <EmptyDescription>
                Create the your first site to get started.
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            <Link to={"/sites/create"}>
                <Button>
                    <Plus/>
                    Create site
                </Button>
            </Link>
        </EmptyContent>
    </Empty>;
};
