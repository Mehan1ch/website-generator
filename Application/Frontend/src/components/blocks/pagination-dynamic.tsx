import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {Link} from "@tanstack/react-router";

export type PaginationDynamicProps = {
    currentPage?: number;
    lastPage?: number;
}


export const PaginationDynamic = ({currentPage = 1, lastPage = 1}: PaginationDynamicProps) => {
    const middlePages = lastPage > 2 ? Array.from({length: lastPage - 2}, (_, i) => i + 2) : [];
    if (lastPage == 1) {
        return null;
    }

    return <Pagination>
        <PaginationContent>
            {currentPage > 1 &&
                <PaginationItem>
                    <Link to={"."} search={{
                        page: currentPage - 1
                    }}>
                        <PaginationPrevious/>
                    </Link>
                </PaginationItem>
            }
            <PaginationItem>
                <Link to={"."} search={{page: 1}}>
                    <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
                </Link>
            </PaginationItem>
            {currentPage > 3 &&
                <PaginationItem>
                    <PaginationEllipsis/>
                </PaginationItem>
            }
            {middlePages.map((page) => {
                return (<PaginationItem>
                    <Link to={"."} search={{
                        page: page
                    }}>
                        <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                    </Link>
                </PaginationItem>);
            })}
            {currentPage < lastPage - 2 &&
                <PaginationItem>
                    <PaginationEllipsis/>
                </PaginationItem>
            }
            <PaginationItem>
                <Link to={"."} search={{page: lastPage}}>
                    <PaginationLink isActive={currentPage === lastPage}>{lastPage}</PaginationLink>
                </Link>
            </PaginationItem>
            {
                currentPage < lastPage && <PaginationItem>
                    <Link to={"."} search={{page: currentPage + 1}}>
                        <PaginationNext/>
                    </Link>
                </PaginationItem>
            }
        </PaginationContent>
    </Pagination>;
};