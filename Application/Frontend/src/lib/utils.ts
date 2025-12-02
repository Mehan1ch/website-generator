import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {SiteState} from "@/types/site.ts";
import {SchemaState} from "@/types/schema.ts";
import {deflateRaw, inflateRaw} from "pako";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function compressAndEncodeBase64(data: string) {
    const utf8Data = new TextEncoder().encode(data);
    const compressedData = deflateRaw(utf8Data);
    return btoa(String.fromCharCode(...compressedData));
}

export function decodeBase64AndDecompress(base64String: string) {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const decompressedData = inflateRaw(bytes);
    return new TextDecoder().decode(decompressedData);
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
            return "secondary";
        case "draft":
            return "secondary";
        default:
            return "outline";
    }
};

export const getStateBadgeColor = (state?: SchemaState | SiteState): string => {
    switch (state) {
        case "published":
            return "border-green-200 text-green-700";
        case "draft":
            return "border-orange-200 text-yellow-700";
        default:
            return "";
    }
};

export const capitalize = <T extends string>(s: T) => (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>;

export const getDateString = (dateString: string | undefined | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

export const getBackgroundColorClass = (bgClass: string) => {
    const styles = getComputedStyle(document.documentElement);
    const value = styles.getPropertyValue(bgClass);
    if (value === "") {
        return bgClass;
    }
    return value;
};

export const getEditorDisplayName = (name: string) => {
    return name.startsWith('Editor') ? name.slice(6) : name;
};