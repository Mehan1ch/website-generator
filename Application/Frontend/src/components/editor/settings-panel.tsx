import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Slider} from "@/components/ui/slider"

export const SettingsPanel = () => {
    return (
        <Card className="bg-muted mt-2 px-4 py-4">
            <CardContent className="flex flex-col space-y-4 p-0">
                <div>
                    <div className="flex items-center justify-between pb-2">
                        <span className="text-base font-medium">Selected</span>
                        <span
                            className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Selected</span>
                    </div>
                </div>
                <div>
                    <Label className="mb-2 block">Prop</Label>
                    <Slider
                        defaultValue={[0]}
                        min={7}
                        max={50}
                        step={1}
                        className="w-full"
                    />
                </div>
                <Button variant="default" className="w-full">
                    Delete
                </Button>
            </CardContent>
        </Card>
    )
}