import zod from "zod";

export const customerSigninSchema = zod.object({
    email: zod.string(),
    password: zod.string()
});

export type CustomerSigninSchema = zod.infer<typeof customerSigninSchema>;