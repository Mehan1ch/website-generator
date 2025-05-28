import {Button} from "../ui/button"
import {Switch} from "../ui/switch"
import {useEditor} from "@craftjs/core";

export const Topbar = () => {
    const {actions, query, enabled} = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    return (
        <div className="outline bg-primary-foreground px-2 py-2 mt-3 mb-1 rounded">
            <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                    <Switch
                        checked={enabled}
                        onCheckedChange={value => actions.setOptions(options => options.enabled = value)}
                    />
                    <span className="text-sm font-medium">Enable</span>
                </label>
                <Button
                    size="sm"
                    variant="outline"
                    className="text-secondary border-secondary"
                    onClick={() => {
                        console.log(query.serialize())
                    }}
                >
                    Serialize JSON to console
                </Button>
            </div>
        </div>
    )
}