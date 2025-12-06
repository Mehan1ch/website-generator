import {Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {PencilOff} from "lucide-react";

export const EditorDisabledEmpty = () => {
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <PencilOff/>
            </EmptyMedia>
            <EmptyTitle>Disabled</EmptyTitle>
            <EmptyDescription>
                The editor is currently disabled. Enable it to make changes.
            </EmptyDescription>
        </EmptyHeader>
    </Empty>;
};