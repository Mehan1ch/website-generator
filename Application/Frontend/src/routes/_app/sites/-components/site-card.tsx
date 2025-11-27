import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useRouter} from "@tanstack/react-router";
import {calculateCardDescription, getDateString} from "@/lib/utils.ts";
import {StateBadge} from "@/components/blocks/state-badge.tsx";
import {SiteCollectionItem, SiteState} from "@/types/site.ts";


export type SiteCardProps = {
    page: SiteCollectionItem
}


export const SiteCard = ({page}: SiteCardProps) => {
    const router = useRouter();
    const onCardClick = () => {
        if (page?.id == undefined) return;
        router.navigate({
            to: "/sites/$siteId",
            params: {
                siteId: page?.id
            }
        });
    };


    return <Card
        className={"outline-1 hover:bg-secondary hover:shadow-lg hover:shadow-primary/50"}
        onClick={onCardClick}>
        <CardHeader>
            <CardTitle className={"flex justify-between"}>
                {page?.name}
                <StateBadge state={page?.state as SiteState}/>
            </CardTitle>
            <CardDescription>
                {page?.subdomain}
            </CardDescription>
        </CardHeader>
        <CardContent className={"h-full"}>
            {calculateCardDescription(page?.description)}
        </CardContent>
        <CardFooter className="flex justify-between">
            <p className="text-muted-foreground text-sm">
                Created at: <br/> {getDateString(page?.created_at)}
            </p>
            <p className="text-muted-foreground text-sm">
                Updated at: <br/> {getDateString(page?.updated_at)}
            </p>
            <p className="text-muted-foreground text-sm">
                Published at: <br/> {getDateString(page?.published_at)}
            </p>
        </CardFooter>
    </Card>;
};
