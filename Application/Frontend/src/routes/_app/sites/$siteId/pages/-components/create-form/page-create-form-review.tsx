import {useForm} from "react-hook-form";
import {CreatePageBody} from "@/types/pages.ts";
import {CardContent} from "@/components/ui/card.tsx";
import {Preview} from "@/routes/_app/-components/editor/blocks/preview.tsx";

type PageCreateFormReviewProps = {
    form: ReturnType<typeof useForm<CreatePageBody>>
}

export const PageCreateFormReview = ({form}: PageCreateFormReviewProps) => {
    return <CardContent className={"space-y-6"}>
        <div>
            <div>
                <p className="text-sm font-medium mb-2">Title</p>
                <p className="mb-4">{form.getValues("title")}</p>
            </div>
            <div>
                <p className="text-sm font-medium mb-2">Url</p>
                <p className="mb-4">{form.getValues("url")}</p>
            </div>
            <div>
                <p className="text-sm font-medium mb-2">Content</p>
                <Preview content={form.getValues("content")}/>
            </div>
        </div>
    </CardContent>;
};