import {Spinner} from "@/components/ui/spinner.tsx";

export const Loading = () => {
    return <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Spinner/> Loading
    </div>;
};