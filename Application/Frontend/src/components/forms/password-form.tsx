import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {toast} from "sonner";
import {useApi} from "@/hooks/use-api.tsx";
import {UpdatePasswordBody, updatePasswordFormSchema} from "@/types/auth.ts";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";


type PasswordFormProps = {
    className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export function PasswordForm({
                                 className,
                                 ...props
                             }: PasswordFormProps) {

    const [loading, setLoading] = useState(false);
    const api = useApi();
    const updatePasswordMutation = api.useMutation("put", "/user/password", {
        onSuccess: () => {
            setLoading(false);
            toast.success("Password updated successfully, please login again!");
        },
        onError: (error) => {
            form.reset();
            setLoading(false);
            toast.error("Failed to update password!", {
                description: error.message
            });
        }
    });


    const form = useForm<UpdatePasswordBody>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: ''
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    return (
        <div {...props}>
            <form className={cn("flex flex-col gap-6", className)}
                  onSubmit={form.handleSubmit((data) => {
                      setLoading(true);
                      updatePasswordMutation.mutate({body: data});
                  })}
            >
                <Card>
                    <FieldGroup>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you&apos;ll be logged
                                out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Controller
                                    name="current_password"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="current_password">Current Password</FieldLabel>
                                            <Input {...field}
                                                   id="current_password"
                                                   type="password"
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
                                    name="password"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="password">Current Password</FieldLabel>
                                            <Input {...field}
                                                   id="password"
                                                   type="password"
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
                                    name="password_confirmation"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="password_confirmation">Current Password</FieldLabel>
                                            <Input {...field}
                                                   id="password_confirmation"
                                                   type="password"
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
                        <CardFooter>
                            <Button type={"submit"} disabled={loading}>
                                {loading && <Spinner/>}
                                Save password
                            </Button>
                        </CardFooter>
                    </FieldGroup>
                </Card>
            </form>
        </div>
    );
}
