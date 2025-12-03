import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {useNode} from "@craftjs/core";
import {Controller, useForm} from "react-hook-form";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {capitalize} from "@/lib/utils.ts";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

type EditorButtonProps = CommonEditorSettingsType & {
    size: "sm" | "lg" | "default" | "icon" | null | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    color?: string;
    children: React.ReactNode;
}

export const EditorButton = ({
                                 size,
                                 variant = "default",
                                 color,
                                 children,
                                 margin_top = 0,
                                 margin_bottom = 0,
                                 margin_left = 0,
                                 margin_right = 0,
                                 padding_top = 0,
                                 padding_bottom = 0,
                                 padding_left = 0,
                                 padding_right = 0,
                                 background = "",
                             }: EditorButtonProps) => {
    const {connectors: {connect, drag}} = useNode();

    return (
        <Button
            ref={ref => {
                connect(drag(ref!));
            }}
            size={size}
            variant={variant}
            color={color}
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
            }}
        >
            {children}
        </Button>
    );
};

export const ButtonSettings = () => {
    const {actions: {setProp}, props} = useNode((node) => ({
        props: node.data.props as EditorButtonProps
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
                    <AccordionItem value={"button"}>
                        <AccordionTrigger>Button</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-4">
                                <Controller
                                    control={form.control}
                                    name="props.size"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Size</FieldLabel>
                                            <ToggleGroup
                                                type={"single"}
                                                variant={"outline"}
                                                orientation={"horizontal"}
                                                value={props.size || "default"}
                                                onValueChange={value => {
                                                    field.onChange(value);
                                                    setProp((props: EditorButtonProps) => {
                                                        props.size = value as any;
                                                    });
                                                }}>
                                                <ToggleGroupItem value="sm" id="size-sm">Small</ToggleGroupItem>
                                                <ToggleGroupItem value="default"
                                                                 id="size-default">Default</ToggleGroupItem>
                                                <ToggleGroupItem value="lg" id="size-lg">Large</ToggleGroupItem>
                                            </ToggleGroup>
                                        </Field>
                                    )}
                                />
                                <Controller
                                    control={form.control}
                                    name="props.variant"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Variant</FieldLabel>
                                            <Select
                                                value={props.variant || "default"}
                                                onValueChange={value => {
                                                    field.onChange(value);
                                                    setProp((props: EditorButtonProps) => {
                                                        props.variant = value as any;
                                                    });
                                                }}>
                                                <SelectTrigger>
                                                    {capitalize(props.variant || "default")}
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="default"
                                                    >Default</SelectItem>
                                                    <SelectItem value="outline"
                                                    >Outline</SelectItem>
                                                    <SelectItem value="ghost"
                                                    >Ghost</SelectItem>
                                                    <SelectItem value="link"
                                                    >Link</SelectItem>
                                                </SelectContent>
                                            </Select>
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

EditorButton.craft = {
    props: {
        size: "default",
        variant: "default",
        color: "primary",
        children: "Click me",
        ...CommonDefaults,
    },
    related: {
        settings: ButtonSettings
    }
};

