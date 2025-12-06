import {EditorText} from "./editor-text.tsx";
import {EditorButton} from "@/routes/_app/-components/editor/components/editor-button.tsx";
import {Element, Node, useNode} from "@craftjs/core";
import {ReactNode} from "react";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {useForm} from "react-hook-form";


type EditorCardProps = CommonEditorSettingsType & {
    className?: string;
}

interface EditorCardSectionProps {
    children: ReactNode;
}

// Editable Card Header Section
export const EditorCardHeaderSection = ({children}: EditorCardSectionProps) => {
    const {connectors: {connect}} = useNode();
    return (
        <CardHeader ref={ref => {
            connect(ref!);
        }}>
            {children}
        </CardHeader>
    );
};

EditorCardHeaderSection.craft = {
    rules: {
        // Only accept Text components in header
        canMoveIn: (incomingNodes: [Node]) => incomingNodes.every(incomingNode => incomingNode.data.type === EditorText)
    }
};

// Editable Card Content Section
export const EditorCardContentSection = ({children}: EditorCardSectionProps) => {
    const {connectors: {connect}} = useNode();
    return (
        <CardContent ref={ref => {
            connect(ref!);
        }}>
            {children}
        </CardContent>
    );
};

EditorCardContentSection.craft = {
    rules: {
        // Accept both Text and Buttons in content
        canMoveIn: (incomingNodes: [Node]) => incomingNodes.every(incomingNode =>
            incomingNode.data.type === EditorText || incomingNode.data.type === EditorButton
        )
    }
};

// Editable Card Footer Section
export const EditorCardFooterSection = ({children}: EditorCardSectionProps) => {
    const {connectors: {connect}} = useNode();
    return (
        <CardFooter ref={ref => {
            connect(ref!);
        }}>
            {children}
        </CardFooter>
    );
};

EditorCardFooterSection.craft = {
    rules: {
        // Accept both Text and Buttons in footer
        canMoveIn: (incomingNodes: [Node]) => incomingNodes.every(incomingNode =>
            incomingNode.data.type === EditorText || incomingNode.data.type === EditorButton
        )
    }
};


export const EditorCard = ({
                               className,
                               margin_top = 0,
                               margin_bottom = 0,
                               margin_left = 0,
                               margin_right = 0,
                               padding_top = 0,
                               padding_bottom = 0,
                               padding_left = 0,
                               padding_right = 0,
                           }: EditorCardProps) => {
    const {connectors: {connect, drag}} = useNode();

    return (
        <Card
            ref={ref => {
                connect(drag(ref!));
            }}
            className={className}
            style={{
                marginTop: margin_top ? `${margin_top}px` : undefined,
                marginBottom: margin_bottom ? `${margin_bottom}px` : undefined,
                marginLeft: margin_left ? `${margin_left}px` : undefined,
                marginRight: margin_right ? `${margin_right}px` : undefined,
                paddingTop: padding_top ? `${padding_top}px` : undefined,
                paddingBottom: padding_bottom ? `${padding_bottom}px` : undefined,
                paddingLeft: padding_left ? `${padding_left}px` : undefined,
                paddingRight: padding_right ? `${padding_right}px` : undefined,
            }}
        >
            <Element id="header" is={EditorCardHeaderSection} canvas>
                <EditorText text="Card Title" fontSize={20}/>
                <EditorText text="Card description goes here" fontSize={14}/>
            </Element>
            <Element id="content" is={EditorCardContentSection} canvas>
                <EditorText text="This is the card content area. You can add text and other elements here."
                            fontSize={14}/>
            </Element>
            <Element id="footer" is={EditorCardFooterSection} canvas>
                <EditorButton size="sm" variant="default" text="Learn more"/>
            </Element>
        </Card>
    );
};

const CardSettings = () => {
    const {
        actions: {setProp},
        props
    } = useNode((node) => ({
        props: node.data.props as EditorCardProps,
    }));

    const form = useForm<{ props: EditorCardProps }>({
        defaultValues: {
            props,
        },
    });

    return (
        <form>
            <CommonSettings
                control={form.control}
                setProp={setProp}
                currentProps={props}
            />
        </form>
    );
};

EditorCard.craft = {
    props: {
        className: "",
        ...CommonDefaults,
    },
    related: {
        settings: CardSettings
    }
};