import * as React from "react";
import {useNode} from "@craftjs/core";
import {Controller, useForm} from "react-hook-form";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {BackgroundEditorSettingsType} from "@/types/editor-settings.tsx";
import {ColorPickerBlock} from "@/components/blocks/color-picker-block.tsx";

type EditorContainerProps = BackgroundEditorSettingsType & {
    children?: React.ReactNode;
}

export const EditorContainer = (props: EditorContainerProps) => {
    const {connectors: {connect, drag}} = useNode();
    return (
        <div className={"w-full h-full"}
             ref={ref => {
                 connect(drag(ref!));
             }}>
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
        <form className="flex flex-col gap-4 h-full">
            <Controller
                control={form.control}
                name="props.background"
                render={({fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="props.background">Background</FieldLabel>
                        <ColorPickerBlock
                            color={props.background || ""}
                            onChange={(color) => setProp((props: {
                                background: string;
                            }) => props.background = color.toString())}
                        />
                    </Field>
                )}
            />
        </form>
    );
};

// We export this because we'll be using this in the Card component as well
export const ContainerDefaultProps = {
    background: "",
};

EditorContainer.craft = {
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings
    }
};