import {useNode} from "@craftjs/core";
import {Controller, useForm} from "react-hook-form";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {capitalize, cn} from "@/lib/utils.ts";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";

type EditorImageProps = CommonEditorSettingsType & {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
    className?: string;
};

export const EditorImage = ({
                                src = "",
                                alt = "Image",
                                width,
                                height,
                                objectFit = "cover",
                                className,
                                margin_top = 0,
                                margin_bottom = 0,
                                margin_left = 0,
                                margin_right = 0,
                                padding_top = 0,
                                padding_bottom = 0,
                                padding_left = 0,
                                padding_right = 0,
                            }: EditorImageProps) => {
    const {
        connectors: {connect, drag},
    } = useNode();

    return (
        <div
            ref={(ref) => {
                connect(drag(ref!));
            }}
            className={cn("w-full", className)}
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
            <img
                src={src}
                alt={alt}
                className="w-full h-auto rounded-md min-h-10"
                style={{
                    width: width ? `${width}px` : undefined,
                    height: height ? `${height}px` : undefined,
                    objectFit: objectFit,
                }}
            />
        </div>
    );
};

const ImageSettings = () => {
    const {
        actions: {setProp},
        props,
    } = useNode((node) => ({
        props: node.data.props as EditorImageProps,
    }));

    const form = useForm<{ props: EditorImageProps }>({
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
                    <AccordionItem value="image">
                        <AccordionTrigger>Image Settings</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-4">
                                {/* Image URL */}
                                <Field>
                                    <FieldLabel>Image URL</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.src"
                                        render={({field}) => (
                                            <Textarea
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setProp(
                                                        (props: EditorImageProps) =>
                                                            (props.src = e.target.value)
                                                    );
                                                }}
                                                placeholder=""
                                                rows={3}
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Alt Text */}
                                <Field>
                                    <FieldLabel>Alt Text</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.alt"
                                        render={({field}) => (
                                            <Input
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setProp(
                                                        (props: EditorImageProps) =>
                                                            (props.alt = e.target.value)
                                                    );
                                                }}
                                                placeholder="Describe the image"
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Width */}
                                <Field>
                                    <FieldLabel>Width (px) - Leave empty for auto</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.width"
                                        render={({field}) => (
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                        ? parseInt(e.target.value)
                                                        : undefined;
                                                    field.onChange(value);
                                                    setProp(
                                                        (props: EditorImageProps) =>
                                                            (props.width = value)
                                                    );
                                                }}
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Height */}
                                <Field>
                                    <FieldLabel>Height (px) - Leave empty for auto</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.height"
                                        render={({field}) => (
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                        ? parseInt(e.target.value)
                                                        : undefined;
                                                    field.onChange(value);
                                                    setProp(
                                                        (props: EditorImageProps) =>
                                                            (props.height = value)
                                                    );
                                                }}
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Object Fit */}
                                <Field>
                                    <FieldLabel>Object Fit</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.objectFit"
                                        render={({field}) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setProp(
                                                        (props: EditorImageProps) =>
                                                            (props.objectFit = value as "cover" | "contain" | "fill" | "none" | "scale-down")
                                                    );
                                                }}
                                            >
                                                <SelectTrigger>{capitalize(props.objectFit)}</SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cover">Cover</SelectItem>
                                                    <SelectItem value="contain">Contain</SelectItem>
                                                    <SelectItem value="fill">Fill</SelectItem>
                                                    <SelectItem value="none">None</SelectItem>
                                                    <SelectItem value="scale-down">Scale Down</SelectItem>
                                                </SelectContent>
                                            </Select>
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

EditorImage.craft = {
    props: {
        src: "",
        alt: "Image",
        objectFit: "cover" as const,
        className: "",
        ...CommonDefaults,
    },
    related: {
        settings: ImageSettings,
    },
};

