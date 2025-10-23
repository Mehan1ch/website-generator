import {z} from "zod";

export const updatePasswordFormSchema = z.object({
    current_password: z.string().min(8, "Current password must be at least 8 characters long"),
    password: z.string().min(8, "New password must be at least 8 characters long"),
    password_confirmation: z.string().min(8, "Confirm password must be at least 8 characters long"),
}).superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match.",
            path: ["password_confirmation"],
        });
    }
});

export type UpdatePasswordBody = z.infer<typeof updatePasswordFormSchema>;

export const updateProfileFormSchema = z.object({
    name: z.string().max(255, "Name is required"),
    email: z.email("Invalid email address"),
});

export type UpdateProfileBody = z.infer<typeof updateProfileFormSchema>;

export const forgotPasswordFormSchema = z.object({
    email: z.email("Invalid email address"),
});

export type ForgotPasswordBody = z.infer<typeof forgotPasswordFormSchema>;

export const resetPasswordFormSchema = z.object({
    email: z.email("Invalid email address.").max(255, "Email must be at most 255 characters."),
    password: z.string().min(8, "Password must be at least 8 characters long.").max(128, "Password must be at most 128 characters."),
    password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters long.").max(128, "Password confirmation must be at most 128 characters."),
    token: z.string().min(1, "Token is required."),
}).superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match.",
            path: ["password_confirmation"],
        });
    }
});

export type ResetPasswordBody = z.infer<typeof resetPasswordFormSchema>;
export const avatarFormSchema = z.object({
    avatar: z.union([
        z.file().min(1).max(2048 * 2048).mime("image/png"),
        z.string().optional()
    ])
});

export type AvatarBody = z.infer<typeof avatarFormSchema>;