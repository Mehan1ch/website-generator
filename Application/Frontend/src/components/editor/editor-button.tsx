import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {useNode} from "@craftjs/core";

type EditorButtonProps = {
    size: "sm" | "lg" | "default" | "icon" | null | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    color?: string;
    children: React.ReactNode;
}


export const EditorButton = ({size, variant = "default", color, children}: EditorButtonProps) => {
    const {connectors: {connect, drag}} = useNode();
    return (
        <Button
            ref={ref => {
                connect(drag(ref!))
            }}
            size={size} variant={variant} color={color}>
            {children}
        </Button>
    )
}