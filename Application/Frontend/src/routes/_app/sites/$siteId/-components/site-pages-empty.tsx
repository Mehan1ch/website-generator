import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {Layers, Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

type SitePagesEmptyProps = {
    siteId: string;
}

export const SitePagesEmpty = ({siteId}: SitePagesEmptyProps) => {
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <Layers/>
            </EmptyMedia>
            <EmptyTitle>No pages found</EmptyTitle>
            <EmptyDescription>
                Get started by creating your first page.
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            <Link to={"/sites/$siteId/pages/create"} params={{
                siteId: siteId,
            }}>
                <Button>
                    <Plus/>
                    Create Page
                </Button>
            </Link>
        </EmptyContent>
    </Empty>;
};