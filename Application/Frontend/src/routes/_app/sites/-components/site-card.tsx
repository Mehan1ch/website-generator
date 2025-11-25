import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useRouter} from "@tanstack/react-router";
import {calculateCardDescription, getDateString} from "@/lib/utils.ts";
import {StateBadge} from "@/components/blocks/state-badge.tsx";
import {SiteCollectionItem, SiteState} from "@/types/site.ts";


export type SiteCardProps = {
    site: SiteCollectionItem
}


export const SiteCard = ({site}: SiteCardProps) => {
    const router = useRouter();
    const onCardClick = () => {
        if (site?.id == undefined) return;
        router.navigate({
            to: "/sites/$siteId",
            params: {
                siteId: site?.id
            }
        });
    };


    return <Card
        className={"outline-1 hover:bg-secondary hover:shadow-lg hover:shadow-primary/50"}
        onClick={onCardClick}>
        <CardHeader>
            <CardTitle className={"flex justify-between"}>
                {site?.name}
                <StateBadge state={site?.state as SiteState}/>
            </CardTitle>
            <CardDescription>
                {site?.subdomain}
            </CardDescription>
        </CardHeader>
        <CardContent className={"h-full"}>
            {calculateCardDescription(site?.description)}
        </CardContent>
        <CardFooter className="flex justify-between">
            <p className="text-muted-foreground text-sm">
                Created at: {getDateString(site?.created_at)}
            </p>
            <p className="text-muted-foreground text-sm">
                Updated at: {getDateString(site?.updated_at)}
            </p>
            <p className="text-muted-foreground text-sm">
                Published at: {getDateString(site?.published_at)}
            </p>
        </CardFooter>
    </Card>;
};
