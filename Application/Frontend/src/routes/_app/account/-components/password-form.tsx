"use client";

import {useState} from "react";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {AlertCircle, Eye, EyeOff, Lock} from "lucide-react";
import {useAuth} from "@/hooks/use-auth.tsx";
import {useRouter} from "@tanstack/react-router";
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {Controller, useForm} from "react-hook-form";
import {UpdatePasswordBody, updatePasswordFormSchema} from "@/types/account.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";


export default function PasswordForm() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    const {logout} = useAuth();
    const router = useRouter();

    const updatePasswordMutation = api.useMutation("put", "/user/password", {
        onSuccess: async () => {
            try {
                await logout();
                toast.success("Password updated successfully, please login again!");
                router.history.push("/login");
            } catch (error) {
                setLoading(false);
                toast.error("Failed to logout after password update. Please logout manually.", {
                    description: (error as APIError).message,
                });
            }
        },
        onError: (error) => {
            form.reset();
            setLoading(false);
            toast.error("Failed to update password!", {
                description: error.message
            });
        }
    });

    const getPasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
        if (/\d/.test(password)) strength += 15;
        if (/[^a-zA-Z\d]/.test(password)) strength += 15;
        return Math.min(strength, 100);
    };

    const getStrengthLabel = (strength: number): { text: string; color: string } => {
        if (strength < 40) return {text: "Weak", color: "text-red-600"};
        if (strength < 60) return {text: "Fair", color: "text-orange-600"};
        if (strength < 80) return {text: "Good", color: "text-yellow-600"};
        return {text: "Strong", color: "text-green-600"};
    };


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

    const handleSubmit = (data: UpdatePasswordBody) => {
        setLoading(true);
        updatePasswordMutation.mutate({body: data});
    };

    const strength = getPasswordStrength(form.getValues("password"));
    const strengthInfo = getStrengthLabel(strength);

    return (
        <div className="mx-auto max-w-2xl p-6">
            <Card className="bg-card border p-8">
                <div className="border-b pb-6">
                    <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                        <Lock className="h-6 w-6"/>
                        Change Password
                    </h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Update your password to keep your account secure
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-6">
                    <FieldGroup>
                        {/* Current Password */}
                        <div className="space-y-2">
                            <Controller
                                name="current_password"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="current_password">Current Password</FieldLabel>
                                        <div className="relative">
                                            <Input {...field}
                                                   id="current_password"
                                                   type={showCurrent ? "text" : "password"}
                                                   aria-invalid={fieldState.invalid}
                                                   required/>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowCurrent(!showCurrent)}
                                            >
                                                {showCurrent ? <EyeOff className="h-4 w-4"/> :
                                                    <Eye className="h-4 w-4"/>}
                                            </Button>
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* New Password */
                        }
                        <div className="space-y-2">
                            <Controller
                                name="password"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <div className="relative">
                                            <Input {...field}
                                                   id="password"
                                                   type={showNew ? "text" : "password"}
                                                   aria-invalid={fieldState.invalid}
                                                   required/>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowNew(!showNew)}
                                            >
                                                {showNew ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                            </Button>
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                        {fieldState.isDirty && (
                                            <div className="space-y-2 mt-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Password strength:</span>
                                                    <span
                                                        className={`font-medium ${strengthInfo.color}`}>{strengthInfo.text}</span>
                                                </div>
                                                <Progress value={strength} className="h-2"/>
                                            </div>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Confirm Password */
                        }
                        <div className="space-y-2">
                            <Controller
                                name="password_confirmation"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password_confirmation">Password
                                            Confirmation</FieldLabel>
                                        <div className="relative">
                                            <Input {...field}
                                                   id="password_confirmation"
                                                   type={showConfirm ? "text" : "password"}
                                                   aria-invalid={fieldState.invalid}
                                                   required/>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                            >
                                                {showConfirm ? <EyeOff className="h-4 w-4"/> :
                                                    <Eye className="h-4 w-4"/>}
                                            </Button>
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Submit Button */
                        }
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Spinner/>}
                                Update Password
                            </Button>
                        </div>
                    </FieldGroup>
                </form>

                <div className="bg-muted/50 mt-6 rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 text-blue-500"/>
                        <div>
                            <h4 className="mb-1 text-sm font-medium">Security Notice</h4>
                            <p className="text-muted-foreground text-sm">
                                After changing your password, you'll be logged and need to
                                log in again.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
