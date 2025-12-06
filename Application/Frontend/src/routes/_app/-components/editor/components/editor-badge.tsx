import {useNode} from "@craftjs/core";
import {Controller, useForm} from "react-hook-form";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";

type EditorBadgeProps = CommonEditorSettingsType & {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    className?: string;
};

export const EditorBadge = ({
                                text = "Badge",
                                variant = "default",
                                className,
                                margin_top = 0,
                                margin_bottom = 0,
                                margin_left = 0,
                                margin_right = 0,
                                padding_top = 0,
                                padding_bottom = 0,
                                padding_left = 0,
                                padding_right = 0,
                            }: EditorBadgeProps) => {
    const {
        connectors: {connect, drag},
        actions: {setProp},
    } = useNode();

    return (
        <div
            ref={(ref) => {
                connect(drag(ref!));
            }}
            className={className}
            style={{
                display: "inline-block",
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
            <Badge
                variant={variant}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                    setProp((props: EditorBadgeProps) => {
                        props.text = e.currentTarget.textContent || "Badge";
                    });
                }}
            >
                {text}
            </Badge>
        </div>
    );
};

const BadgeSettings = () => {
    const {
        actions: {setProp},
        props,
    } = useNode((node) => ({
        props: node.data.props as EditorBadgeProps,
    }));

    const form = useForm<{ props: EditorBadgeProps }>({
        defaultValues: {
            props,
        },
    });

    return (
        <form className="flex flex-col gap-4">
            <CommonSettings
                control={form.control}
                setProp={setProp}
                currentProps={props}
                customSettings={
                    <AccordionItem value="badge">
                        <AccordionTrigger>Badge</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-4">
                                {/* Text Input */}
                                <Field>
                                    <FieldLabel>Text</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.text"
                                        render={({field}) => (
                                            <Input
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setProp(
                                                        (props: EditorBadgeProps) =>
                                                            (props.text = e.target.value)
                                                    );
                                                }}
                                                placeholder="Badge text"
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Variant Toggle */}
                                <Field>
                                    <FieldLabel>Variant</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.variant"
                                        render={({field}) => (
                                            <ToggleGroup
                                                type="single"
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    if (value) {
                                                        field.onChange(value);
                                                        setProp(
                                                            (props: EditorBadgeProps) =>
                                                                (props.variant = value as EditorBadgeProps["variant"])
                                                        );
                                                    }
                                                }}
                                                className="grid grid-cols-2 gap-2"
                                            >
                                                <ToggleGroupItem value="default" className="text-xs">
                                                    Default
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="secondary" className="text-xs">
                                                    Secondary
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="outline" className="text-xs">
                                                    Outline
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="destructive" className="text-xs">
                                                    Destructive
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        )}
                                    />
                                </Field>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                }
            />
        </form>
    );
};

EditorBadge.craft = {
    props: {
        text: "Badge",
        variant: "default" as const,
        className: "",
        ...CommonDefaults,
    },
    related: {
        settings: BadgeSettings,
    },
};

