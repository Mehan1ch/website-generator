import * as React from "react";
import {Card} from "@/components/ui/card.tsx";
import {useNode} from "@craftjs/core";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel} from "../ui/form";
import {ColorPicker} from "@/components/ui/color-picker.tsx";
import {Slider} from "@/components/ui/slider.tsx";

interface EditorContainerProps {
    background: string;
    padding?: number;
    children: React.ReactNode;
}

export const EditorContainer = ({background, padding = 0, children}: EditorContainerProps) => {
    const {connectors: {connect, drag}} = useNode();
    return (
        <Card
            ref={ref => {
                connect(drag(ref!))
            }}
            style={{margin: "5px 0", background, padding: `${padding}px`}}>
            {children}
        </Card>
    )
}

export const ContainerSettings = () => {
    const {background, padding, actions: {setProp}} = useNode(node => ({
        background: node.data.props.background,
        padding: node.data.props.padding
    }));

    const form = useForm({
        defaultValues: {
            background,
            padding,
        }
    });

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="background"
                    render={() => (
                        <FormItem>
                            <FormLabel>Background</FormLabel>
                            <FormControl>
                                <ColorPicker
                                    color={background || "#000"}
                                    onChange={color => setProp((props: {
                                        background: string;
                                    }) => props.background = color)}
                                    value={""}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="padding"
                    render={() => (
                        <FormItem>
                            <FormLabel>Padding</FormLabel>
                            <FormControl>
                                <Slider
                                    value={[padding]}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onValueChange={([value]) => setProp((props: {
                                        padding: number;
                                    }) => props.padding = value)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

// We export this because we'll be using this in the Card component as well
export const ContainerDefaultProps = {
    background: "#ffffff",
    padding: 3
};

EditorContainer.craft = {
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings
    }
}