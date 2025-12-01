import {Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {Component} from "lucide-react";

export const EditorSelectedEmpty = () => {
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <Component/>
            </EmptyMedia>
            <EmptyTitle>None</EmptyTitle>
            <EmptyDescription>
                No component is selected. Please select a component to see its settings.
            </EmptyDescription>
        </EmptyHeader>
    </Empty>;
};
