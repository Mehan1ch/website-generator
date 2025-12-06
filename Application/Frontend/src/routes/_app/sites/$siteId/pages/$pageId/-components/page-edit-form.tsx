import {Link, useRouter} from "@tanstack/react-router";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {api} from "@/lib/api/api-client.ts";
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Globe, Save} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Page, UpdatePageBody, updatePageForm} from "@/types/pages.ts";

type PageEditFormProps = {
    site_id: string;
    page: Page
}
export const PageEditForm = ({page, site_id}: PageEditFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const editPageMutation = api.useMutation("put", "/api/v1/site/{site_id}/page/{page_id}");


    const form = useForm<UpdatePageBody>({
        resolver: zodResolver(updatePageForm),
        defaultValues: {
            title: page.title,
            url: page.url,
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const handleSubmit = (data: UpdatePageBody) => {
        setLoading(true);
        const loadingToast = toast.loading("Updating page...");
        editPageMutation.mutate({
            params: {
                path: {
                    site_id: site_id,
                    page_id: page.id || "",
                }
            },
            body: data
        }, {
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success("Page updated successfully.");
                router.navigate({
                    to: "/sites/$siteId/pages/$pageId",
                    params: {
                        siteId: site_id,
                        pageId: page.id || "",
                    }
                });
            },
            onError: (err) => {
                setLoading(false);
                toast.dismiss(loadingToast);
                toast.error("Failed to update page: ", {
                    description: err.message,
                });
            }
        });
    };

    return <div className="max-w-5xl p-6">
        <form className={"flex flex-col gap-6"}
              onSubmit={form.handleSubmit((data: UpdatePageBody) => {
                  handleSubmit(data);
              })}
        >
            <FieldGroup>
                <Card className="bg-card border p-8">
                    <div className="border-b pb-6">
                        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <Globe/>
                            Update Page
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Update the details of your page
                        </p>
                    </div>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                            <Controller
                                name="title"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="title">Title</FieldLabel>
                                        <Input {...field}
                                               id="title"
                                               type="text"
                                               placeholder="About page"
                                               aria-invalid={fieldState.invalid}
                                               required/>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Controller
                                name="url"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="url">Url</FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="url"
                                            name="url"
                                            placeholder="/about"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className={"flex justify-end gap-2"}>
                        <Link to={".."}>
                            <Button type="button" variant={"outline"}>
                                Discard changes
                            </Button>
                        </Link>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Spinner/> : <Save/>}
                            Save changes
                        </Button>
                    </CardFooter>
                </Card>
            </FieldGroup>
        </form>
    </div>;
};