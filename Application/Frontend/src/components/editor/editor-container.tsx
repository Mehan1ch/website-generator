import * as React from "react";
import {Card} from "@/components/ui/card.tsx";
import {useNode} from "@craftjs/core";

interface EditorContainerProps {
    background: string;
    padding?: number;
    children: React.ReactNode;
}

export const EditorContainer = ({background, padding = 0, children}: EditorContainerProps) => {
    const {connectors: {connect, drag}} = useNode();
    return (
        <Card
            ref={ref => {
                connect(drag(ref!))
            }}
            style={{margin: "5px 0", background, padding: `${padding}px`}}>
            {children}
        </Card>
    )
}