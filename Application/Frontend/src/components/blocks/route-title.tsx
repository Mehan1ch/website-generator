import {cn} from "@/lib/utils.ts";

type RouteTitleProps = {
    title: string;
    description: string;
    className?: string;
}
export const RouteTitle = ({title, description, className}: RouteTitleProps) => {
    return <div className={cn("mb-8", className)}>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">
            {description}
        </p>
    </div>;
};