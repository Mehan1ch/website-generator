import {Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {LayoutDashboard} from "lucide-react";

type DashboardEmptyProps = {
    className?: string;
}

export const DashboardEmpty = ({className}: DashboardEmptyProps) => {
    return <Empty>
        <EmptyHeader className={className}>
            <EmptyMedia variant="icon">
                <LayoutDashboard/>
            </EmptyMedia>
            <EmptyTitle>No data to display</EmptyTitle>
            <EmptyDescription>
                There is currently no data available to display on the dashboard. Please check back later!
            </EmptyDescription>
        </EmptyHeader>
    </Empty>;
};
