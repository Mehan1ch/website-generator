import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {LayoutTemplateIcon, Save} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateSchemaBody, createSchemaForm} from "@/types/schema.ts";
import {Link, useRouter} from "@tanstack/react-router";
import {toast} from "sonner";
import {api, APIError} from "@/lib/api/api-client.ts";
import {Textarea} from "@/components/ui/textarea.tsx";

export const SchemaCreateForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const createSchemaMutation = api.useMutation("post", "/api/v1/schema");


    const form = useForm<CreateSchemaBody>({
        resolver: zodResolver(createSchemaForm),
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const handleSubmit = (data: CreateSchemaBody) => {
        setLoading(true);
        const loadingToast = toast.loading("Creating schema...");
        createSchemaMutation.mutate({body: data}, {
            onSuccess: (data) => {
                toast.dismiss(loadingToast);
                toast.success("Schema created successfully.");
                router.navigate({
                    to: "/schemas/$schemaId",
                    params: {
                        schemaId: data?.data?.id || "",
                    }
                });
            },
            onError: (err: APIError) => {
                setLoading(false);
                toast.dismiss(loadingToast);
                toast.error("Failed to create schema: ", {
                    description: err.message,
                });
            }
        });
    };

    return <div className="max-w-5xl p-6">
        <form className={"flex flex-col gap-6"}
              onSubmit={form.handleSubmit((data: CreateSchemaBody) => {
                  handleSubmit(data);
              })}
        >
            <FieldGroup>
                <Card className="bg-card border p-8">
                    <div className="border-b pb-6">
                        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <LayoutTemplateIcon/>
                            Create Schema
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
                            {loading && <Spinner/>}
                            <Save/>
                            Save changes
                        </Button>
                    </CardFooter>
                </Card>
            </FieldGroup>
        </form>
    </div>;
};