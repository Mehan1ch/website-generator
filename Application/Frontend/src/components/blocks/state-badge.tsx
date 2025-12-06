import {capitalize, cn, getStateBadgeColor, getStateBadgeVariant} from "@/lib/utils.ts";
import {SiteState} from "@/types/site.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {SchemaState} from "@/types/schema.ts";
import {getStateBadgeIcon} from "@/lib/element-utils.tsx";

type StateBadgeProps = {
    className?: string;
    state?: SchemaState | SiteState;
}

export const StateBadge = ({className, state}: StateBadgeProps) => {
    if (!state) {
        return null;
    }
    return <Badge className={cn(className, getStateBadgeColor(state))}
                  variant={getStateBadgeVariant(state)}>{getStateBadgeIcon(state)}{capitalize(state)}</Badge>;
};