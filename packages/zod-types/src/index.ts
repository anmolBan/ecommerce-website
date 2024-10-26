import Email from "next-auth/providers/email";
import zod from "zod";

export const customerSigninSchema = zod.object({
    email: zod.string(),
    password: zod.string()
});

export type CustomerSigninSchema = zod.infer<typeof customerSigninSchema>;

export const customerSignupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string(),
    phone: zod.string(),
    password: zod.string()
});

export type CustomerSignupType = zod.infer<typeof customerSignupSchema>;