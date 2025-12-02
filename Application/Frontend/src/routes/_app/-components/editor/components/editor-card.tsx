import {ContainerSettings, EditorContainer} from "./editor-container.tsx";
import {EditorText} from "./editor-text.tsx";
import {EditorButton} from "@/routes/_app/-components/editor/components/editor-button.tsx";
import {Element, Node, useNode} from "@craftjs/core";
import {ReactNode} from "react";
import {CommonDefaults} from "@/types/editor-settings.ts";


interface EditorCardProps {
    background: string;
    padding?: number;
}

interface EditorCardSectionProps {
    children: ReactNode;
}

export const EditorCardTop = ({children}: EditorCardSectionProps) => {
    const {connectors: {connect}} = useNode();
    return (
        <div ref={ref => {
            connect(ref!);
        }} className="text-only">
            {children}
        </div>
    );
};

EditorCardTop.craft = {
    rules: {
        // Only accept Text
        canMoveIn: (incomingNodes: [Node]) => incomingNodes.every(incomingNode => incomingNode.data.type === EditorText)
    }
};

export const EditorCardBottom = ({children}: EditorCardSectionProps) => {
    const {connectors: {connect}} = useNode();
    return (
        <div ref={ref => {
            connect(ref!);
        }}>
            {children}
        </div>
    );
};

EditorCardBottom.craft = {
    rules: {
        // Only accept Buttons
        canMoveIn: (incomingNodes: [Node]) => incomingNodes.every(incomingNode => incomingNode.data.type === EditorButton)
    }
};


export const EditorCard = ({background, padding = 20}: EditorCardProps) => {
    return (
        <EditorContainer background={background} padding={padding}>
            <Element id="text" is={EditorCardTop} canvas> // Canvas Node of type div
                <EditorText text="Title" fontSize={20}/>
                <EditorText text="Subtitle" fontSize={15}/>
            </Element>
            <Element id="buttons" is={EditorCardBottom} canvas> // Canvas Node of type div
                <EditorButton size="sm" variant="default" color="primary">
                    Learn more
                </EditorButton>
            </Element>
        </EditorContainer>
    );
};

EditorCard.craft = {
    props: CommonDefaults,
    related: {
        // Since Card has the same settings as Container, we'll just reuse ContainerSettings
        settings: ContainerSettings
    }
};