import {Node, useEditor, useNode} from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";

interface EditorTextProps extends CommonEditorSettingsType {
    text: string;
    fontSize?: number;
    textAlign?: "left" | "center" | "right";
}

interface EditorTextState {
    hasSelectedNode: boolean;
    hasDraggedNode: boolean;
}

export const EditorText = ({
                               text,
                               fontSize = 20,
                               textAlign = "left",
                               margin_top = 0,
                               margin_bottom = 0,
                               margin_left = 0,
                               margin_right = 0,
                               padding_top = 0,
                               padding_bottom = 0,
                               padding_left = 0,
                               padding_right = 0,
                               background = "",
                           }: EditorTextProps) => {
    const {
        connectors: {connect, drag},
        hasSelectedNode,
        actions: {setProp}
    } = useNode((state: Node): EditorTextState => ({
        hasSelectedNode: state.events.selected,
        hasDraggedNode: state.events.dragged
    }));

    const [editable, setEditable] = useState(false);
    const {enabled} = useEditor((state) => ({
        enabled: state.options.enabled
    }));


    useEffect(() => {
        if (!hasSelectedNode) {
            setEditable(false);
        }
    }, [hasSelectedNode]);

    return (
        <div
            ref={ref => {
                connect(drag(ref!));
            }}
            onClick={() => {
                if (enabled) setEditable(true);
            }}
            className="w-full max-w-full"
            style={{
                marginTop: `${margin_top}px`,
                marginBottom: `${margin_bottom}px`,
                marginLeft: `${margin_left}px`,
                marginRight: `${margin_right}px`,
                paddingTop: `${padding_top}px`,
                paddingBottom: `${padding_bottom}px`,
                paddingLeft: `${padding_left}px`,
                paddingRight: `${padding_right}px`,
                background: background || undefined,
            }}
        >
            <ContentEditable
                disabled={!editable}
                html={text}
                onChange={e =>
                    setProp((props: { text: string; }) =>
                        props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")
                    )
                }
                tagName="p"
                style={{fontSize: `${fontSize}px`, textAlign}}
                className="break-words overflow-wrap-anywhere max-w-full"
            />
        </div>
    );
};

const TextSettings = () => {
    const {actions: {setProp}, props} = useNode((node) => ({
        props: node.data.props as EditorTextProps
    }));
    const form = useForm({
        defaultValues: {
            props: props
        }
    });

    return (
        <form className="flex flex-col gap-4 h-full">
            <CommonSettings
                control={form.control}
                setProp={setProp}
                currentProps={props}
                customSettings={
                    <AccordionItem value={"typography"}>
                        <AccordionTrigger>Typography</AccordionTrigger>
                        <AccordionContent>

                            <div className="flex flex-col gap-4">
                                <Controller
                                    control={form.control}
                                    name="props.fontSize"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="props.fontSize">Font Size (px)</FieldLabel>
                                            <Input
                                                type="number"
                                                min={7}
                                                max={100}
                                                value={field.value || 12}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value) || 12;
                                                    field.onChange(value);
                                                    setProp((props: EditorTextProps) => {
                                                        props.fontSize = value;
                                                    });
                                                }}
                                            />
                                        </Field>
                                    )}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                }
            />
        </form>
    );
};

EditorText.craft = {
    props: {
        text: "Text",
        fontSize: 12,
        ...CommonDefaults,
    },
    rules: {},
    related: {
        settings: TextSettings
    }
};