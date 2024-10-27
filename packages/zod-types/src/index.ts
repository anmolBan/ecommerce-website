import Email from "next-auth/providers/email";
import zod from "zod";

export const customerSigninSchema = zod.object({
    email: zod.string(),
    password: zod.string()
});

export type CustomerSigninSchema = zod.infer<typeof customerSigninSchema>;

export const customerSignupSchema = zod.object({
    firstName: zod.string().min(3).max(25),
    lastName: zod.string().min(3).max(25),
    email: zod.string().email(),
    phone: zod.string().length(10),
    password: zod.string().min(8).max(15)
});

export type CustomerSignupType = zod.infer<typeof customerSignupSchema>;