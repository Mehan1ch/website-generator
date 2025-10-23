import {z} from "zod";
import {paths} from "@/lib/api/v1";

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginBody) => Promise<void>;
    logout: () => Promise<void>;
    register: (credentials: RegisterBody) => Promise<void>;
    fetchUserContext: () => Promise<void>;
    deleteUser: () => Promise<void>;
}

export type User = paths["/api/user"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

export const loginFormSchema = z.object({
    email: z.email("Invalid email address.").max(255, "Email must be at most 255 characters."),
    password: z.string().min(8, "Password must be at least 8 characters long.").max(128, "Password must be at most 128 characters."),
});

export type LoginBody = z.infer<typeof loginFormSchema>;


export const registerFormSchema = z.object({
    name: z.string().max(255, "Name must be at most 255 characters."),
    email: z.email("Invalid email address.").max(255, "Email must be at most 255 characters."),
    password: z.string().min(8, "Password must be at least 8 characters long.").max(128, "Password must be at most 128 characters."),
    password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters long.").max(128, "Password confirmation must be at most 128 characters."),
}).superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match.",
            path: ["password_confirmation"],
        });
    }
});

export type RegisterBody = z.infer<typeof registerFormSchema>;