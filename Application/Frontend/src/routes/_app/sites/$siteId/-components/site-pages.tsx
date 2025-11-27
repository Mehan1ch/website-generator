import {PageCollectionItem, PageCollectionResponse} from "@/types/pages.ts";
import {PaginationDynamic} from "@/components/blocks/pagination-dynamic.tsx";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {SitePagesEmpty} from "@/routes/_app/sites/$siteId/-components/site-pages-empty.tsx";
import {PageCard} from "@/routes/_app/sites/$siteId/-components/page-card.tsx";


type SitePagesProps = {
    pageCollectionResponse: PageCollectionResponse
    siteId: string
};

export const SitePages = ({pageCollectionResponse, siteId}: SitePagesProps) => {
    const pages: PageCollectionItem[] = pageCollectionResponse?.data || [];
    if (pages?.length > 0) {
        return <>
            <div className="mb-8 flex items-end justify-end">
                <Link to={"/sites/$siteId/pages/create"} params={{
                    siteId: siteId
                }}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4"/>
                        New Page
                    </Button>
                </Link>
            </div>
            <div className={"grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3"}>
                {pages.map(page => {
                    return (<PageCard key={page.id} page={page}/>);
                })}
            </div>
            <PaginationDynamic currentPage={pageCollectionResponse.meta?.current_page}
                               lastPage={pageCollectionResponse.meta?.last_page}/>
        </>;
    } else {
        return <div className={"flex w-full min-h-screen items-center justify-center"}>
            <SitePagesEmpty/>
        </div>;
    }
};