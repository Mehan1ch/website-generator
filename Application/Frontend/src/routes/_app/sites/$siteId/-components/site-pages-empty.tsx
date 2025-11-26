import {Empty, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {StickyNote} from "lucide-react";

export const SitePagesEmpty = () => {
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <StickyNote/>
            </EmptyMedia>
            <EmptyTitle>No pages found</EmptyTitle>
        </EmptyHeader>
    </Empty>;
};