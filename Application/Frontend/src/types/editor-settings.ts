import {z} from "zod";

export const MarginEditorSettings = z.object({
    margin_top: z.number().min(0).max(100).default(0).optional(),
    margin_bottom: z.number().min(0).max(100).default(0).optional(),
    margin_left: z.number().min(0).max(100).default(0).optional(),
    margin_right: z.number().min(0).max(100).default(0).optional(),
});

export const MarginDefaults = {
    margin_top: 0,
    margin_bottom: 0,
    margin_left: 0,
    margin_right: 0,
} as const;

export type MarginEditorSettingsType = z.infer<typeof MarginEditorSettings>;

export const PaddingEditorSettings = z.object({
    padding_top: z.number().min(0).max(100).default(0).optional(),
    padding_bottom: z.number().min(0).max(100).default(0).optional(),
    padding_left: z.number().min(0).max(100).default(0).optional(),
    padding_right: z.number().min(0).max(100).default(0).optional(),
});

export const PaddingDefaults = {
    padding_top: 0,
    padding_bottom: 0,
    padding_left: 0,
    padding_right: 0,
} as const;

export type PaddingEditorSettingsType = z.infer<typeof PaddingEditorSettings>;
export const BackgroundEditorSettings = z.object({
    background: z.string().default("#ffffff").optional(),
});

export const BackgroundDefaults = {
    background: "#ffffff",
} as const;

export type BackgroundEditorSettingsType = z.infer<typeof BackgroundEditorSettings>;

export const CommonEditorSettings = z.object({
    ...MarginEditorSettings.shape,
    ...PaddingEditorSettings.shape,
    ...BackgroundEditorSettings.shape,
});

export const CommonDefaults = {
    ...MarginDefaults,
    ...PaddingDefaults,
} as const;

export type CommonEditorSettingsType = z.infer<typeof CommonEditorSettings>;