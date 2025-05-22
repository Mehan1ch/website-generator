import {Button} from "../ui/button"
import {Switch} from "../ui/switch"

export const Topbar = () => {
    return (
        <div className="bg-[#cbe8e7] px-2 py-2 mt-3 mb-1 rounded">
            <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                    <Switch checked={true}/>
                    <span className="text-sm font-medium">Enable</span>
                </label>
                <Button
                    size="sm"
                    variant="outline"
                    className="text-secondary border-secondary"
                >
                    Serialize JSON to console
                </Button>
            </div>
        </div>
    )
}