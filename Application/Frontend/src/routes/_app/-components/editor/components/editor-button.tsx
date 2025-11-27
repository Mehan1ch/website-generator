import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {useNode} from "@craftjs/core";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

type EditorButtonProps = {
    size: "sm" | "lg" | "default" | "icon" | null | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    color?: string;
    children: React.ReactNode;
}


export const EditorButton = ({size, variant = "default", color, children}: EditorButtonProps) => {
    const {connectors: {connect, drag}} = useNode();
    return (
        <Button
            ref={ref => {
                connect(drag(ref!));
            }}
            size={size} variant={variant} color={color}>
            {children}
        </Button>
    );
};

export const ButtonSettings = () => {
    const {actions: {setProp}, props} = useNode((node) => ({
        props: node.data.props
    }));

    const form = useForm({
        defaultValues: {
            size: props.size,
            variant: props.variant,
            color: props.color,
        }
    });

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="size"
                    render={() => (
                        <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    value={props.size}
                                    onValueChange={value => setProp((props: { size: string; }) => props.size = value)}
                                    className="flex flex-col gap-1"
                                >
                                    <FormLabel htmlFor="size-sm">Small</FormLabel>
                                    <RadioGroupItem value="sm" id="size-sm"/>
                                    <FormLabel htmlFor="size-default">Medium</FormLabel>
                                    <RadioGroupItem value="default" id="size-default"/>
                                    <FormLabel htmlFor="size-lg">Large</FormLabel>
                                    <RadioGroupItem value="lg" id="size-lg"/>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="variant"
                    render={() => (
                        <FormItem>
                            <FormLabel>Variant</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    value={props.variant}
                                    onValueChange={value => setProp((props: {
                                        variant: string;
                                    }) => props.variant = value)}
                                    className="flex flex-col gap-1"
                                >
                                    <FormLabel htmlFor="variant-default">Default</FormLabel>
                                    <RadioGroupItem value="default" id="variant-default"/>
                                    <FormLabel htmlFor="variant-outline">Outline</FormLabel>
                                    <RadioGroupItem value="outline" id="variant-outline"/>
                                    <FormLabel htmlFor="variant-ghost">Ghost</FormLabel>
                                    <RadioGroupItem value="ghost" id="variant-ghost"/>
                                    <FormLabel htmlFor="variant-link">Link</FormLabel>
                                    <RadioGroupItem value="link" id="variant-link"/>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={() => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    value={props.color}
                                    onValueChange={value => setProp((props: { color: string; }) => props.color = value)}
                                    className="flex flex-col gap-1"
                                >
                                    <FormLabel htmlFor="color-default">Default</FormLabel>
                                    <RadioGroupItem value="default" id="color-default"/>
                                    <FormLabel htmlFor="color-primary">Primary</FormLabel>
                                    <RadioGroupItem value="primary" id="color-primary"/>
                                    <FormLabel htmlFor="color-secondary">Secondary</FormLabel>
                                    <RadioGroupItem value="secondary" id="color-secondary"/>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

EditorButton.craft = {
    props: {
        size: "small",
        variant: "contained",
        color: "primary",
        text: "Click me"
    },
    related: {
        settings: ButtonSettings
    }
};