import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {AlertCircleIcon, Ban} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {APIError} from "@/lib/api/api-client.ts";

type ErrorBoundaryProps = {
    error: Error;
}

export const ErrorBoundary = ({error}: ErrorBoundaryProps) => {
    const errors = (error as APIError)?.errors as Array<string>;
    const message = (error as APIError)?.message;
    return <div className="flex w-full min-h-screen items-center justify-center">
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Ban className={"color"}/>
                </EmptyMedia>
                <EmptyTitle>
                    Something went wrong. Please try again later.
                </EmptyTitle>
                <EmptyDescription>
                    See details below:
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="text-left text-wrap">
                <Alert variant="destructive">
                    <AlertCircleIcon/>
                    <AlertTitle>{message}</AlertTitle>
                    <AlertDescription>
                        <ul className="list-inside list-disc text-sm">
                            {errors?.map((error) => (
                                <li>{error} </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            </EmptyContent>
            <Link to={"/"} search={{redirect: "/"}}>
                <Button variant="link">
                    Back to Home
                </Button>
            </Link>
        </Empty>
    </div>;
};