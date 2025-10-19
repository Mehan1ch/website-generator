import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/hooks/use-auth.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {toast} from "sonner";
import {useApi} from "@/hooks/use-api.tsx";
import {UpdateProfileBody, updateProfileFormSchema} from "@/types/auth.ts";

type ProfileFormProps = {
    className?: string;
} & React.ComponentPropsWithoutRef<"div">;


export function ProfileForm({
                                className,
                                ...props
                            }: ProfileFormProps) {

    const {user, updateUserContext} = useAuth();
    const [loading, setLoading] = useState(false);
    const api = useApi();
    const updateProfileMutation = api.useMutation("put", "/user/profile-information",
        {
            onSuccess: async () => {
                await updateUserContext();
                setLoading(false);
                toast.success("Profile updated successfully!");
            },
            onError: (error) => {
                toast.error("Failed to update profile!", {
                    description: error.message
                });
                form.reset();
                setLoading(false);
            }
        });

    const form = useForm<UpdateProfileBody>({
        resolver: zodResolver(updateProfileFormSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    return (
        <div {...props}>
            <form className={cn("flex flex-col gap-6", className)}
                  onSubmit={form.handleSubmit((data) => {
                      setLoading(true);
                      updateProfileMutation.mutate({body: data});
                  })}
            >
                <FieldGroup>
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you&apos;re
                                done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                            <Input {...field}
                                                   id="name"
                                                   type="text"
                                                   placeholder="John Doe"
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
                                    name="email"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="email">Email</FieldLabel>
                                            <Input
                                                {...field}
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                aria-invalid={fieldState.invalid}
                                                required
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading}>
                                {loading && <Spinner/>}
                                Save changes
                            </Button>
                        </CardFooter>
                    </Card>
                </FieldGroup>
            </form>
        </div>
    );
}