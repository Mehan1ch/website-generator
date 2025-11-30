import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {Loading} from "@/components/blocks/loading.tsx";
import {SchemaCollectionItem, SchemaCollectionResponse} from "@/types/schema.ts";
import {PaginationDynamic} from "@/components/blocks/pagination-dynamic.tsx";
import {
    Choicebox,
    ChoiceboxItem,
    ChoiceboxItemContent,
    ChoiceboxItemDescription,
    ChoiceboxItemHeader,
    ChoiceboxItemIndicator,
    ChoiceboxItemTitle
} from "@/components/ui/choicebox.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog";
import {Eye} from "lucide-react";
import {Preview} from "@/routes/_app/-components/editor/blocks/preview.tsx";

type PageCreateFormSchemasProps = {
    page: number
    selectedSchema: string;
    setSelectedSchema: (schema: SchemaCollectionItem) => void;
}

type SchemaDialogPreviewProps = {
    content: string | undefined;
}

const SchemaDialogPreview = ({content}: SchemaDialogPreviewProps) => {
    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="default">
                <Eye/>
                Preview
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <Preview content={content}/>
            <DialogFooter className="gap-2 sm:gap-0 mt-6">
                <DialogClose asChild className="mx-2">
                    <Button variant="outline">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};

export const PageCreateFormSchemas = ({page, selectedSchema, setSelectedSchema}: PageCreateFormSchemasProps) => {
    const {data, isLoading, error} = api.useQuery("get", "/api/v1/schema", {
        params: {
            query: {
                page: page,
                per_page: 5,
            }
        }
    });

    if (error) {
        toast.error("Failed to load schemas", {
            description: (error as APIError).message
        });
    }

    if (!data || isLoading) {
        return <Loading/>;
    }

    const schemaCollectionResponse: SchemaCollectionResponse = data;
    const schemas: SchemaCollectionItem[] = schemaCollectionResponse?.data || [];
    return <div className={"space-y-4"}>
        <Choicebox defaultValue={selectedSchema}>
            {schemas.map((schema: SchemaCollectionItem) => (
                <ChoiceboxItem onClick={() => setSelectedSchema(schema)} key={schema.id}
                               value={schema?.id || ""} className="col-span-1">
                    <ChoiceboxItemHeader>
                        <ChoiceboxItemTitle>
                            {schema.name}
                        </ChoiceboxItemTitle>
                        <ChoiceboxItemDescription>
                            <SchemaDialogPreview content={schema.content || ""}/>
                        </ChoiceboxItemDescription>
                    </ChoiceboxItemHeader>
                    <ChoiceboxItemContent>
                        <ChoiceboxItemIndicator/>
                    </ChoiceboxItemContent>
                </ChoiceboxItem>
            ))}
        </Choicebox>
        <PaginationDynamic currentPage={schemaCollectionResponse.meta?.current_page}
                           lastPage={schemaCollectionResponse.meta?.last_page}/>
    </div>;
};