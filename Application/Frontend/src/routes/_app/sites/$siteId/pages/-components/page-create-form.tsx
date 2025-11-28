import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Globe, Save} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useRouter} from "@tanstack/react-router";
import {toast} from "sonner";
import {api, APIError} from "@/lib/api/api-client.ts";
import {CreatePageBody, createPageForm} from "@/types/pages.ts";

type PageCreateFormProps = {
    siteId: string;
}
export const PageCreateForm = ({siteId}: PageCreateFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const createPageMutation = api.useMutation("post", "/api/v1/site/{site_id}/page");


    const form = useForm<CreatePageBody>({
        resolver: zodResolver(createPageForm),
        defaultValues: {
            title: "",
            url: "",
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const handleSubmit = (data: CreatePageBody) => {
        setLoading(true);
        const loadingToast = toast.loading("Creating page...");
        createPageMutation.mutate({
            params: {
                path: {
                    site_id: siteId,
                }
            },
            body: data
        }, {
            onSuccess: (data) => {
                toast.dismiss(loadingToast);
                toast.success("Page created successfully.");
                router.navigate({
                    to: "/sites/$siteId/pages/$pageId",
                    params: {
                        siteId: siteId,
                        pageId: data?.data?.id || "",
                    }
                });
            },
            onError: (err: APIError) => {
                setLoading(false);
                toast.dismiss(loadingToast);
                toast.error("Failed to create page: ", {
                    description: err.message,
                });
            }
        });
    };

    return <div className="max-w-5xl p-6">
        <form className={"flex flex-col gap-6"}
              onSubmit={form.handleSubmit((data: CreatePageBody) => {
                  handleSubmit(data);
              })}
        >
            <FieldGroup>
                <Card className="bg-card border p-8">
                    <div className="border-b pb-6">
                        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <Globe/>
                            Create Page
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Enter the details of your new page
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
                                        <Input {...field}
                                               id="url"
                                               type="text"
                                               placeholder="/about"
                                               aria-invalid={fieldState.invalid}
                                               required/>
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
                            <Button variant={"outline"}>
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