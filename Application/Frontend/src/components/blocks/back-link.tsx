import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft} from "lucide-react";
import {Link} from "@tanstack/react-router";

type BackLinkProps = {
    text?: string;
}

export const BackLink = (props: BackLinkProps) => {
    return (
        <Link to={".."}>
            <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4"/>
                {props.text || 'Back'}
            </Button>
        </Link>
    );
};