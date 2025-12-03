import * as React from "react";
import {useNode} from "@craftjs/core";
import {useForm} from "react-hook-form";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {cn} from "@/lib/utils.ts";

type EditorContainerProps = CommonEditorSettingsType & {
    children?: React.ReactNode;
}

export const EditorContainer = (props: EditorContainerProps) => {
    const {connectors: {connect, drag}} = useNode();
    return (
        <div
            className={cn("w-full h-full min-h-full")}
            ref={ref => {
                connect(drag(ref!));
            }}
            style={{
                marginTop: props.margin_top ? `${props.margin_top}px` : undefined,
                marginBottom: props.margin_bottom ? `${props.margin_bottom}px` : undefined,
                marginLeft: props.margin_left ? `${props.margin_left}px` : undefined,
                marginRight: props.margin_right ? `${props.margin_right}px` : undefined,
                paddingTop: props.padding_top ? `${props.padding_top}px` : undefined,
                paddingBottom: props.padding_bottom ? `${props.padding_bottom}px` : undefined,
                paddingLeft: props.padding_left ? `${props.padding_left}px` : undefined,
                paddingRight: props.padding_right ? `${props.padding_right}px` : undefined,
                backgroundColor: props.background && props.background !== "#ffffff" ? props.background : undefined,
            }}
        >
            {props?.children}
        </div>
    );
};

export const ContainerSettings = () => {
    const {props, actions: {setProp}} = useNode(node => ({
        props: node.data.props as EditorContainerProps,
    }));

    const form = useForm({
        defaultValues: {
            props,
        }
    });

    return (
        <form className="flex flex-col gap-4">
            <CommonSettings
                control={form.control}
                setProp={setProp}
                currentProps={props}
            />
        </form>
    );
};

EditorContainer.craft = {
    props: CommonDefaults,
    related: {
        settings: ContainerSettings
    }
};