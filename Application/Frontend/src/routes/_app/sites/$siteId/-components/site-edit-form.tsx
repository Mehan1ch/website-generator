import {CreateSiteBody, Site, UpdateSiteBody, updateSiteForm} from "@/types/site.ts";
import {Link, useRouter} from "@tanstack/react-router";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {api, APIError} from "@/lib/api/api-client.ts";
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Globe, Save} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";

type SiteEditFormProps = {
    site: Site
}
export const SiteEditForm = ({site}: SiteEditFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const editSiteMutation = api.useMutation("put", "/api/v1/site/{site_id}");


    const form = useForm<UpdateSiteBody>({
        resolver: zodResolver(updateSiteForm),
        defaultValues: {
            name: site.name,
            subdomain: site.subdomain,
            description: site.description,
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const handleSubmit = (data: UpdateSiteBody) => {
        setLoading(true);
        const loadingToast = toast.loading("Updating site...");
        editSiteMutation.mutate({
            params: {
                path: {
                    site_id: site.id || "",
                }
            },
            body: data
        }, {
            onSuccess: (data) => {
                toast.dismiss(loadingToast);
                toast.success("Site updated successfully.");
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
                toast.error("Failed to update site: ", {
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
                            Update Site
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Update the details of your site
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