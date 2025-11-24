import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {SchemaState, SiteState} from "@/types/state.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const calculateCardDescription = (description: string | null | undefined) => {
    if (description == null || description.length === 0) {
        return 'No description provided.';
    } else if (description.length > 100) {
        return description.substring(0, 100) + '...';
    } else {
        return description;
    }
};


export const getStateBadgeVariant = (state?: SchemaState | SiteState): "default" | "secondary" | "destructive" | "outline" => {
    switch (state) {
        case "published":
            return "default";
        case "draft":
            return "secondary";
        default:
            return "outline";
    }
};

export const capitalize = <T extends string>(s: T) => (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>;

export const getDateString = (dateString: string | undefined | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
};