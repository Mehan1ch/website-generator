import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Globe, Save} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "@tanstack/react-router";
import {toast} from "sonner";
import {api, APIError} from "@/lib/api/api-client.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {CreateSiteBody, createSiteForm} from "@/types/site.ts";

export const SiteCreateForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const createSiteMutation = api.useMutation("post", "/api/v1/site");


    const form = useForm<CreateSiteBody>({
        resolver: zodResolver(createSiteForm),
        defaultValues: {
            name: "",
            subdomain: "",
            description: "",
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const handleSubmit = (data: CreateSiteBody) => {
        setLoading(true);
        const loadingToast = toast.loading("Creating site...");
        createSiteMutation.mutate({body: data}, {
            onSuccess: (data) => {
                toast.dismiss(loadingToast);
                toast.success("Site created successfully.");
                router.navigate({
                    to: "/sites/$siteId",
                    params: {
                        siteId: data?.data?.id || "",
                    }
                });
            },
            onError: (err: APIError) => {
                setLoading(false);
                toast.dismiss(loadingToast);
                toast.error("Failed to create site: ", {
                    description: err.message,
                });
            }
        });
    };

    return <div className="max-w-5xl p-6">
        <form className={"flex flex-col gap-6"}
              onSubmit={form.handleSubmit((data: CreateSiteBody) => {
                  handleSubmit(data);
              })}
        >
            <FieldGroup>
                <Card className="bg-card border p-8">
                    <div className="border-b pb-6">
                        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <Globe/>
                            Create Site
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Enter the details of your new schema
                        </p>
                    </div>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                            <Controller
                                name="name"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>
                                        <Input {...field}
                                               id="name"
                                               type="text"
                                               placeholder="My personal homepage"
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
                                name="subdomain"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="subdomain">Subdomain</FieldLabel>
                                        <Input {...field}
                                               id="subdomain"
                                               type="text"
                                               placeholder="johndoe"
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
                                name="description"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="description">Description</FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="description"
                                            name="description"
                                            placeholder="A brief description of my schema"
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
                        <Button variant={"outline"} onClick={() => router.history.back()}>
                            Discard changes
                        </Button>
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