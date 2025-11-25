import {capitalize, cn, getStateBadgeVariant} from "@/lib/utils.ts";
import {SiteState} from "@/types/site.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {SchemaState} from "@/types/schema.ts";

type StateBadgeProps = {
    className?: string;
    state?: SchemaState | SiteState;
}

export const StateBadge = ({className, state}: StateBadgeProps) => {
    if (!state) {
        return null;
    }
    return <Badge className={cn(className)}
                  variant={getStateBadgeVariant(state)}>{capitalize(state || "")}</Badge>;
};