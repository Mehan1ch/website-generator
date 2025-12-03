import {useNode} from "@craftjs/core";
import {Controller, useForm} from "react-hook-form";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";

type EditorCalendarProps = CommonEditorSettingsType & {
    selectedDate?: string;
    className?: string;
};

export const EditorCalendar = ({
                                   selectedDate,
                                   className,
                                   margin_top = 0,
                                   margin_bottom = 0,
                                   margin_left = 0,
                                   margin_right = 0,
                                   padding_top = 0,
                                   padding_bottom = 0,
                                   padding_left = 0,
                                   padding_right = 0,
                               }: EditorCalendarProps) => {
    const {
        connectors: {connect, drag},
        actions: {setProp},
    } = useNode();

    // Convert ISO string to Date object
    const selected = selectedDate ? new Date(selectedDate) : new Date();

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
            }}
        >
            <Calendar
                mode="single"
                selected={selected}
                onSelect={(date) => {
                    if (date) {
                        setProp((props: EditorCalendarProps) => {
                            props.selectedDate = date.toISOString();
                        });
                    }
                }}
            />
        </div>
    );
};

const CalendarSettings = () => {
    const {
        actions: {setProp},
        props,
    } = useNode((node) => ({
        props: node.data.props as EditorCalendarProps,
    }));

    const form = useForm<{ props: EditorCalendarProps }>({
        defaultValues: {
            props,
        },
    });

    // Format date for input (YYYY-MM-DD)
    const formatDateForInput = (isoString?: string) => {
        if (!isoString) {
            const today = new Date();
            return today.toISOString().split('T')[0];
        }
        return new Date(isoString).toISOString().split('T')[0];
    };

    return (
        <form className="flex flex-col gap-4">
            <CommonSettings
                control={form.control}
                setProp={setProp}
                currentProps={props}
                customSettings={
                    <AccordionItem value="calendar">
                        <AccordionTrigger>Calendar</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-4">
                                {/* Selected Date Input */}
                                <Field>
                                    <FieldLabel>Selected Date</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.selectedDate"
                                        render={({field}) => (
                                            <Input
                                                type="date"
                                                value={formatDateForInput(field.value)}
                                                onChange={(e) => {
                                                    const date = new Date(e.target.value);
                                                    const isoString = date.toISOString();
                                                    field.onChange(isoString);
                                                    setProp((props: EditorCalendarProps) => {
                                                        props.selectedDate = isoString;
                                                    });
                                                }}
                                            />
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

EditorCalendar.craft = {
    props: {
        selectedDate: new Date().toISOString(),
        className: "",
        ...CommonDefaults,
    },
    related: {
        settings: CalendarSettings,
    },
};
