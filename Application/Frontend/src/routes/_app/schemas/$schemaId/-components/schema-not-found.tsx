import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {LayoutTemplateIcon} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";

export const SchemaNotFound = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <LayoutTemplateIcon/>
                </EmptyMedia>
                <EmptyTitle>Schema not found</EmptyTitle>
                <EmptyDescription>
                    The schema you are looking for does not exist or has been deleted.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Link to={"/schemas"}>
                    <Button className="gap-2" variant="link">
                        Go back to Schemas
                    </Button>
                </Link>
            </EmptyContent>
        </Empty>);
};