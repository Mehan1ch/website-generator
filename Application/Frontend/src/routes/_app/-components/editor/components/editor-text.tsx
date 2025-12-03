import {Node, useEditor, useNode} from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Bold, Code, Italic, Strikethrough, Underline} from "lucide-react";

interface EditorTextProps extends CommonEditorSettingsType {
    text: string;
    fontSize?: number;
    textAlign?: "left" | "center" | "right";
    fontWeight?: "normal" | "bold";
    fontStyle?: "normal" | "italic";
    textDecoration?: "none" | "underline" | "line-through";
    fontFamily?: "sans" | "serif" | "mono";
}

interface EditorTextState {
    hasSelectedNode: boolean;
    hasDraggedNode: boolean;
}

export const EditorText = ({
                               text,
                               fontSize = 20,
                               textAlign = "left",
                               fontWeight = "normal",
                               fontStyle = "normal",
                               textDecoration = "none",
                               fontFamily = "sans",
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

    const getFontFamily = () => {
        switch (fontFamily) {
            case "serif":
                return "ui-serif, Georgia, Cambria, Times New Roman, Times, serif";
            case "mono":
                return "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
            default:
                return "ui-sans-serif, system-ui, sans-serif";
        }
    };

    useEffect(() => {
        if (!hasSelectedNode) {
            setEditable(false);
        }
    }, [hasSelectedNode]);

    return (
        <div ref={ref => {
            connect(drag(ref!));
        }}>
            <ContentEditable
                onClick={() => {
                    if (enabled) setEditable(true);
                }}
                disabled={!editable}
                html={text}
                onChange={e =>
                    setProp((props: { text: string; }) =>
                        props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")
                    )
                }
                tagName="p"
                style={{
                    marginTop: margin_top ? `${margin_top}px` : undefined,
                    marginBottom: margin_bottom ? `${margin_bottom}px` : undefined,
                    marginLeft: margin_left ? `${margin_left}px` : undefined,
                    marginRight: margin_right ? `${margin_right}px` : undefined,
                    paddingTop: padding_top ? `${padding_top}px` : undefined,
                    paddingBottom: padding_bottom ? `${padding_bottom}px` : undefined,
                    paddingLeft: padding_left ? `${padding_left}px` : undefined,
                    paddingRight: padding_right ? `${padding_right}px` : undefined,
                    backgroundColor: background && background !== "#ffffff" ? background : undefined,
                    fontSize: `${fontSize}px`,
                    textAlign,
                    fontWeight,
                    fontStyle,
                    textDecoration,
                    fontFamily: getFontFamily(),
                }}
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
        <form className="flex flex-col gap-4">
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
                                <Controller
                                    control={form.control}
                                    name="props.fontWeight"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Font Weight</FieldLabel>
                                            <ToggleGroup
                                                type="single"
                                                variant="outline"
                                                value={props.fontWeight || "normal"}
                                                onValueChange={(value) => {
                                                    if (value) {
                                                        field.onChange(value);
                                                        setProp((props: EditorTextProps) => {
                                                            props.fontWeight = value as any;
                                                        });
                                                    }
                                                }}
                                            >
                                                <ToggleGroupItem value="normal" aria-label="Normal weight">
                                                    Normal
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="bold" aria-label="Bold">
                                                    <Bold className="h-4 w-4"/>
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="props.fontStyle"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Font Style</FieldLabel>
                                            <ToggleGroup
                                                type="single"
                                                variant="outline"
                                                value={props.fontStyle || "normal"}
                                                onValueChange={(value) => {
                                                    if (value) {
                                                        field.onChange(value);
                                                        setProp((props: EditorTextProps) => {
                                                            props.fontStyle = value as any;
                                                        });
                                                    }
                                                }}
                                            >
                                                <ToggleGroupItem value="normal" aria-label="Normal style">
                                                    Normal
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="italic" aria-label="Italic">
                                                    <Italic className="h-4 w-4"/>
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="props.textDecoration"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Text Decoration</FieldLabel>
                                            <ToggleGroup
                                                type="single"
                                                variant="outline"
                                                value={props.textDecoration || "none"}
                                                onValueChange={(value) => {
                                                    if (value) {
                                                        field.onChange(value);
                                                        setProp((props: EditorTextProps) => {
                                                            props.textDecoration = value as any;
                                                        });
                                                    }
                                                }}
                                            >
                                                <ToggleGroupItem value="none" aria-label="No decoration">
                                                    None
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="underline" aria-label="Underline">
                                                    <Underline className="h-4 w-4"/>
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="line-through" aria-label="Strikethrough">
                                                    <Strikethrough className="h-4 w-4"/>
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="props.fontFamily"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Font Family</FieldLabel>
                                            <ToggleGroup
                                                type="single"
                                                variant="outline"
                                                value={props.fontFamily || "sans"}
                                                onValueChange={(value) => {
                                                    if (value) {
                                                        field.onChange(value);
                                                        setProp((props: EditorTextProps) => {
                                                            props.fontFamily = value as any;
                                                        });
                                                    }
                                                }}
                                            >
                                                <ToggleGroupItem value="sans" aria-label="Sans-serif">
                                                    Sans
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="serif" aria-label="Serif">
                                                    Serif
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="mono" aria-label="Monospace">
                                                    <Code className="h-4 w-4"/>
                                                </ToggleGroupItem>
                                            </ToggleGroup>
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