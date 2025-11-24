import {capitalize, getStateBadgeVariant} from "@/lib/utils.ts";
import {SchemaState, SiteState} from "@/types/state.ts";
import {Badge} from "@/components/ui/badge.tsx";

type StateBadgeProps = {
    state?: SchemaState | SiteState;
}

export const StateBadge = ({state}: StateBadgeProps) => {
    return <Badge
        variant={getStateBadgeVariant(state)}>{capitalize(state || "")}</Badge>;
};