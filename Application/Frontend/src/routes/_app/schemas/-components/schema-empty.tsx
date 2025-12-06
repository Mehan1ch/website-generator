import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {LayoutTemplateIcon, Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

type SchemaEmptyProps = {
    className?: string;
    is_admin?: boolean;
}

export const SchemaEmpty = ({is_admin = false, className}: SchemaEmptyProps) => {
    return <Empty>
        <EmptyHeader className={className}>
            <EmptyMedia variant="icon">
                <LayoutTemplateIcon/>
            </EmptyMedia>
            <EmptyTitle>No schemas yet</EmptyTitle>
            <EmptyDescription>
                {is_admin ? "Create the first schema to get started." : "No schemas have been added yet. Check back later!"}
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            {is_admin &&
                <Link to={"/schemas/create"}>
                    <Button>
                        <Plus/>
                        Create Schema
                    </Button>
                </Link>
            }
        </EmptyContent>
    </Empty>;
};