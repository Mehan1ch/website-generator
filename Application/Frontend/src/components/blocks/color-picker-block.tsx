import {
    ColorPicker,
    ColorPickerAlpha,
    ColorPickerEyeDropper,
    ColorPickerFormat,
    ColorPickerHue,
    ColorPickerOutput,
    ColorPickerSelection
} from "@/components/ui/color-picker.tsx";

type ColorPickerBlockProps = {
    color: string,
    onChange: (color: any) => void,
}

export const ColorPickerBlock = ({color, onChange}: ColorPickerBlockProps) => {
    return <ColorPicker color={color} onChange={onChange}
                        className="max-w-sm rounded-md border bg-background p-4 shadow-sm">
        <ColorPickerSelection/>
        <div className="flex items-center gap-4">
            <ColorPickerEyeDropper/>
            <div className="grid w-full gap-1">
                <ColorPickerHue/>
                <ColorPickerAlpha/>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <ColorPickerOutput/>
            <ColorPickerFormat/>
        </div>
    </ColorPicker>;
};