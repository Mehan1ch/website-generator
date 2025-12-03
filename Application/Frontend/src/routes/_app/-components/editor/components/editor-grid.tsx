import {Element, useNode} from "@craftjs/core";
import {ReactNode} from "react";
import {Controller, useForm} from "react-hook-form";
import {CommonDefaults, CommonEditorSettingsType} from "@/types/editor-settings.ts";
import {CommonSettings} from "@/routes/_app/-components/editor/blocks/common-settings.tsx";
import {cn} from "@/lib/utils.ts";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";

type GridDirection = "row" | "column";

type EditorGridProps = CommonEditorSettingsType & {
    direction: GridDirection;
    divisions: number;
    gap: number;
    className?: string;
};

interface EditorGridCellProps {
    children?: ReactNode;
}

export const EditorGridCell = ({children}: EditorGridCellProps) => {
    const {
        connectors: {connect},
    } = useNode();

    return (
        <div
            ref={(ref) => {
                connect(ref!);
            }}
            className="w-full h-full min-h-[100px] rounded-md p-2"
        >
            {children}
        </div>
    );
};

EditorGridCell.craft = {
    rules: {
        canMoveIn: () => true,
    },
};

// Main Grid Component
export const EditorGrid = ({
                               direction = "column",
                               divisions = 2,
                               gap = 16,
                               className,
                               margin_top = 0,
                               margin_bottom = 0,
                               margin_left = 0,
                               margin_right = 0,
                               padding_top = 0,
                               padding_bottom = 0,
                               padding_left = 0,
                               padding_right = 0,
                           }: EditorGridProps) => {
    const {
        connectors: {connect, drag},
    } = useNode();

    // Generate grid cells based on divisions
    const cells = Array.from({length: divisions}, (_, i) => i);

    return (
        <div
            ref={(ref) => {
                connect(drag(ref!));
            }}
            className={cn("w-full", className)}
            style={{
                display: "flex",
                flexDirection: direction,
                gap: `${gap}px`,
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
            {cells.map((i) => (
                <div
                    key={i}
                    className="flex-1"
                    style={{
                        minWidth: direction === "row" ? "100px" : undefined,
                        minHeight: direction === "column" ? "100px" : undefined,
                    }}
                >
                    <Element id={`cell-${i}`} is={EditorGridCell} canvas/>
                </div>
            ))}
        </div>
    );
};

// Grid Settings Panel
const GridSettings = () => {
    const {
        actions: {setProp},
        props,
    } = useNode((node) => ({
        props: node.data.props as EditorGridProps,
    }));

    const form = useForm<{ props: EditorGridProps }>({
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
                    <AccordionItem value="grid">
                        <AccordionTrigger>Grid Layout</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-4">
                                {/* Direction Toggle */}
                                <Field>
                                    <FieldLabel>Direction</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.direction"
                                        render={({field}) => (
                                            <ToggleGroup
                                                type="single"
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    if (value) {
                                                        field.onChange(value);
                                                        setProp(
                                                            (props: EditorGridProps) =>
                                                                (props.direction = value as GridDirection)
                                                        );
                                                    }
                                                }}
                                            >
                                                <ToggleGroupItem value="row">
                                                    Rows
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="column">
                                                    Columns
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        )}
                                    />
                                </Field>

                                {/* Number of Divisions */}
                                <Field>
                                    <FieldLabel>
                                        Number of {props.direction === "row" ? "Rows" : "Columns"}
                                    </FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.divisions"
                                        render={({field}) => (
                                            <Input
                                                type="number"
                                                min={1}
                                                max={6}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (value >= 1 && value <= 6) {
                                                        field.onChange(value);
                                                        setProp(
                                                            (props: EditorGridProps) =>
                                                                (props.divisions = value)
                                                        );
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </Field>

                                {/* Gap */}
                                <Field>
                                    <FieldLabel>Gap (px)</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="props.gap"
                                        render={({field}) => (
                                            <Input
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (value >= 0 && value <= 100) {
                                                        field.onChange(value);
                                                        setProp(
                                                            (props: EditorGridProps) => (props.gap = value)
                                                        );
                                                    }
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

EditorGrid.craft = {
    props: {
        direction: "column" as GridDirection,
        divisions: 2,
        gap: 16,
        className: "",
        ...CommonDefaults,
    },
    related: {
        settings: GridSettings,
    },
};

