import {useNode} from "@craftjs/core";
import {Controller, useForm} from "react-hook-form";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";

type EditorSeparatorProps = CommonEditorSettingsType & {
    orientation: "horizontal" | "vertical";
    className?: string;
};

export const EditorSeparator = ({
                                    orientation = "horizontal",
                                    className,
                                    margin_top = 16,
                                    margin_bottom = 16,
                                    margin_left = 0,
                                    margin_right = 0,
                                    padding_top = 0,
                                    padding_bottom = 0,
                                    padding_left = 0,
                                    padding_right = 0,
                                }: EditorSeparatorProps) => {
    const {
        connectors: {connect, drag},
    } = useNode();

    return (
        <div
            ref={(ref) => {
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
                minHeight: orientation === "vertical" ? "100px" : undefined,
            }}
        >
            <Separator orientation={orientation}/>
        </div>
    );
};

const SeparatorSettings = () => {
    const {
        actions: {setProp},
        props,
    } = useNode((node) => ({
        props: node.data.props as EditorSeparatorProps,
    }));

    const form = useForm<{ props: EditorSeparatorProps }>({
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
                    <AccordionItem value="separator">
                        <AccordionTrigger>Separator</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-4">
                                {/* Orientation Toggle */}
                                <Field>
                                    <FieldLabel>Orientation</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.orientation"
                                        render={({field}) => (
                                            <ToggleGroup
                                                type="single"
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    if (value) {
                                                        field.onChange(value);
                                                        setProp(
                                                            (props: EditorSeparatorProps) =>
                                                                (props.orientation = value as "horizontal" | "vertical")
                                                        );
                                                    }
                                                }}
                                            >
                                                <ToggleGroupItem value="horizontal">
                                                    Horizontal
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="vertical">
                                                    Vertical
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

EditorSeparator.craft = {
    props: {
        orientation: "horizontal" as const,
        className: "",
        ...CommonDefaults,
        margin_top: 16,
        margin_bottom: 16,
    },
    related: {
        settings: SeparatorSettings,
    },
};

