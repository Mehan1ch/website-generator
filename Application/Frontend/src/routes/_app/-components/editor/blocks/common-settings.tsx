import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {ReactNode} from "react";

type CommonSettingsProps<T extends FieldValues> = {
    control: Control<T>;
    setProp: (callback: (props: any) => void) => void;
    currentProps: any;
    customSettings?: ReactNode;
    sections?: {
        spacing?: boolean;
    };
};

export function CommonSettings<T extends FieldValues>({
                                                          control,
                                                          setProp,
                                                          customSettings,
                                                          sections = {spacing: true},
                                                      }: CommonSettingsProps<T>) {
    return (
        <Accordion type="multiple" defaultValue={["margin", "padding", "custom"]} className="w-full">
            {/* Margin Settings */}
            {sections.spacing && (
                <AccordionItem value="margin">
                    <AccordionTrigger>Margin</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-3">
                            <Controller
                                control={control}
                                name={"props.margin_top" as Path<T>}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Top</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={field.value || 0}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                field.onChange(value);
                                                setProp((props: any) => {
                                                    props.margin_top = value;
                                                });
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name={"props.margin_bottom" as Path<T>}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Bottom</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={field.value || 0}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                field.onChange(value);
                                                setProp((props: any) => {
                                                    props.margin_bottom = value;
                                                });
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name={"props.margin_left" as Path<T>}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Left</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={field.value || 0}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                field.onChange(value);
                                                setProp((props: any) => {
                                                    props.margin_left = value;
                                                });
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name={"props.margin_right" as Path<T>}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Right</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={field.value || 0}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                field.onChange(value);
                                                setProp((props: any) => {
                                                    props.margin_right = value;
                                                });
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            )}

            {/* Padding Settings */}
            {sections.spacing && (
                <AccordionItem value="padding">
                    <AccordionTrigger>Padding</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-3">
                            <Controller
                                control={control}
                                name={"props.padding_top" as Path<T>}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Top</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={field.value || 0}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                field.onChange(value);
                                                setProp((props: any) => {
                                                    props.padding_top = value;
                                                });
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name={"props.padding_bottom" as Path<T>}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Bottom</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={field.value || 0}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                field.onChange(value);
                                                setProp((props: any) => {
                                                    props.padding_bottom = value;
                                                });
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name={"props.padding_left" as Path<T>}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Left</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={field.value || 0}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                field.onChange(value);
                                                setProp((props: any) => {
                                                    props.padding_left = value;
                                                });
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name={"props.padding_right" as Path<T>}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Right</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={field.value || 0}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                field.onChange(value);
                                                setProp((props: any) => {
                                                    props.padding_right = value;
                                                });
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            )}
            {/* Custom Settings */}
            {customSettings}
        </Accordion>
    );
}

