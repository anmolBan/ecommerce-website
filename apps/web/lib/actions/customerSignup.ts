"use server"
import prisma from "@repo/db/client";
import { customerSignupSchema, CustomerSignupType } from "@repo/zod-types/zod-types";
import bcrypt from "bcrypt";
import { error } from "console";

export async function customerSignup({firstName, lastName, email, phone, password}: CustomerSignupType){
    const parsedData = customerSignupSchema.safeParse({firstName, lastName, email, phone, password});

    if(!parsedData.success){
        return {success: false, error: "Invalid inputs"}
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const customer = await prisma.customer.findFirst({
            where: {
                OR: [
                    {email},
                    {phoneNumber: phone}
                ]
            }
        });

        if(customer){
            // return {success: false, error: "User already exists."};
            if(customer.email === email){
                return {success:false, error: "Email is already registered"}
            }
            else{
                return {success:false, error: "Phone no. is already registered"}
            }
        }

        await prisma.customer.create({
            data:{
                firstName,
                lastName,
                phoneNumber: phone,
                email,
                passwordHash: hashedPassword
            }
        });
        return {success: true, message: "User created successfully."}
    } catch(error: any){
        console.error("Server error:", error);
        return {
            success: false,
            error: error.message || "An unexpected error occurred"
        };
    }
}