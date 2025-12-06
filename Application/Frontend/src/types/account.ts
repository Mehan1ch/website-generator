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
