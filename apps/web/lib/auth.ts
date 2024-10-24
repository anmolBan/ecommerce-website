import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "jondoe@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials){
                    return null;
                }

                return{
                    id: "1",
                    name: "anmol",
                    phone: "8954834499"
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