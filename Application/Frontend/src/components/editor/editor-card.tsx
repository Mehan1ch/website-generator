import {EditorContainer} from "./editor-container"
import {EditorText} from "./editor-text"
import {EditorButton} from "@/components/editor/editor-button.tsx";
import {Element, Node, useNode} from "@craftjs/core";
import * as React from "react";


interface EditorCardProps {
    background: string;
    padding?: number;
}

interface EditorCardSectionProps {
    children: React.ReactNode;
}

export const EditorCardTop = ({children}: EditorCardSectionProps) => {
    const {connectors: {connect}} = useNode();
    return (
        <div ref={ref => {
            connect(ref!);
        }} className="text-only">
            {children}
        </div>
    )
}

EditorCardTop.craft = {
    rules: {
        // Only accept Text
        canMoveIn: (incomingNodes: [Node]) => incomingNodes.every(incomingNode => incomingNode.data.type === EditorText)
    }
}

export const EditorCardBottom = ({children}: EditorCardSectionProps) => {
    const {connectors: {connect}} = useNode();
    return (
        <div ref={ref => {
            connect(ref!);
        }}>
            {children}
        </div>
    )
}

EditorCardBottom.craft = {
    rules: {
        // Only accept Buttons
        canMoveIn: (incomingNodes: [Node]) => incomingNodes.every(incomingNode => incomingNode.data.type === EditorButton)
    }
}


export const EditorCard = ({background, padding = 20}: EditorCardProps) => {
    return (
        <EditorContainer background={background} padding={padding}>
            <Element id="text" is={EditorCardTop}> // Canvas Node of type div
                <EditorText text="Title" size={20}/>
                <EditorText text="Subtitle" size={15}/>
            </Element>
            <Element id="buttons" is={EditorCardBottom}> // Canvas Node of type div
                <EditorButton size="sm" variant="default" color="primary">
                    Learn more
                </EditorButton>
            </Element>
        </EditorContainer>
    )
}
