import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {LayoutTemplateIcon, Save} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateSchemaBody, Schema, UpdateSchemaBody, updateSchemaForm} from "@/types/schema.ts";
import {useRouter} from "@tanstack/react-router";
import {toast} from "sonner";
import {api, APIError} from "@/lib/api/api-client.ts";

type SchemaEditFormProps = {
    schema: Schema
}
export const SchemaEditForm = ({schema}: SchemaEditFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const editSchemaMutation = api.useMutation("put", "/api/v1/schema/{schema_id}");


    const form = useForm<UpdateSchemaBody>({
        resolver: zodResolver(updateSchemaForm),
        defaultValues: {
            name: schema.name,
            description: schema.description || "",
            content: schema.content || "",
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const handleSubmit = (data: UpdateSchemaBody) => {
        setLoading(true);
        const loadingToast = toast.loading("Updating schema...");
        editSchemaMutation.mutate({
            params: {
                path: {
                    schema_id: schema.id || "",
                }
            },
            body: data
        }, {
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success("Schema updated successfully.");
                router.navigate({
                    to: "/schemas/$schemaId",
                    params: {
                        schemaId: schema.id || "",
                    }
                });
            },
            onError: (err: APIError) => {
                setLoading(false);
                toast.dismiss(loadingToast);
                toast.error("Failed to update schema: ", {
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
                            Edit Schema
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Enter the new details for your schema below.
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
                                        <Input
                                            {...field}
                                            id="description"
                                            type="text"
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