import {
    ColorPicker,
    ColorPickerAlpha,
    ColorPickerEyeDropper,
    ColorPickerFormat,
    ColorPickerHue,
    ColorPickerOutput,
    ColorPickerSelection
} from "@/components/ui/color-picker.tsx";
import Color from "color";
import {useMemo} from "react";

type ColorPickerBlockProps = {
    color: string;
    onChange: (color: string) => void;
}

export const ColorPickerBlock = ({color, onChange}: ColorPickerBlockProps) => {
    const handleColorChange: (value: Parameters<typeof Color.rgb>[0]) => void = useMemo(() => {
        return (rgba) => {
            const rgbaArray = Array.isArray(rgba) ? rgba : [rgba];
            const r = Number(rgbaArray[0]) || 0;
            const g = Number(rgbaArray[1]) || 0;
            const b = Number(rgbaArray[2]) || 0;
            const a = Number(rgbaArray[3]);
            const alpha = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));

            const colorObj = Color.rgb(r, g, b).alpha(alpha);
            onChange(colorObj.hexa());
        };
    }, [onChange]);

    // Normalize the color value to a valid format
    const normalizedColor = useMemo(() => {
        if (!color) return "#ffffff";

        try {
            // If it's already a valid color, use it
            return Color(color).hexa();
        } catch {
            // Try to parse as comma-separated RGBA values like "255,0,0,1"
            const parts = color.split(',').map(p => parseFloat(p.trim()));
            if (parts.length >= 3) {
                const r = Math.min(255, Math.max(0, parts[0] || 0));
                const g = Math.min(255, Math.max(0, parts[1] || 0));
                const b = Math.min(255, Math.max(0, parts[2] || 0));
                const a = parts[3] !== undefined ? Math.min(1, Math.max(0, parts[3])) : 1;
                return Color.rgb(r, g, b).alpha(a).hexa();
            }
            // Fallback to white if all parsing fails
            return "#ffffff";
        }
    }, [color]);

    return (
        <ColorPicker
            value={normalizedColor}
            onChange={handleColorChange}
            className="max-w-sm rounded-md border bg-background p-4 shadow-sm"
        >
            <div className="h-48 w-full">
                <ColorPickerSelection/>
            </div>
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
        </ColorPicker>
    );
};

