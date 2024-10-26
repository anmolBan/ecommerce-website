import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { customerSigninSchema } from "@repo/zod-types/zod-types";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jondoe@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                if(!credentials){
                    return null;
                }

                const loginCredentials = {
                    email: credentials.email,
                    password: credentials.password
                }

                const parsedCredentials = customerSigninSchema.safeParse(loginCredentials);

                if(!parsedCredentials.success){
                    console.log(parsedCredentials.error);
                    throw new Error("Invalid inputs")
                }

                try{
                    const existingUser = await prisma.customer.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });

                    if(!existingUser){
                        throw new Error("Incorrect username or password");
                    }

                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.passwordHash);

                    if(!passwordValidation){
                        throw new Error("Incorrect password");
                    }

                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.firstName + " " + existingUser.lastName,
                        phone: existingUser.phoneNumber,
                        email: existingUser.email
                    }

                } catch(error : any){
                    console.log(error);
                    throw new Error(error.message || "Login failed please tyr again later...")
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User}){
            if(user){
                token.id = user.id,
                token.phone = user.phone,
                token.name = user.name,
                token.email = user.email
            }
            return token;
        },
        async session({ token, session }: {token : JWT, session: Session }) {
            if(session.user){
                session.user.id = token.id;
                session.user.phone = token.phone;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session || {};
        }
    },  
    pages: {
        signIn: "/signin",
        error: "/signin"
    }
}