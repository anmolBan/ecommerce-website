"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customerSignup } from "@/lib/actions/customerSignup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props{}

export default function({}: Props){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] =  useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    async function onClickSignupHandler(){
        setError("");
        const res = await customerSignup({firstName, lastName, email, phone, password});

        if(res.success){
            router.push("/api/auth/signin");
        }
        else{
            setError(res.error);
            console.error(res.error);
        }
    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className='text-3xl font-bold mb-3'>
                Create an account
            </div>
            <div className='text-sm'>
                Enter your details below to create your account
            </div>
            <div className="my-4">
                <div className="flex justify-evenly gap-2 w-96 mt-2">
                    <div className='flex justify-center w-full'>
                        <Input onChange={(e) => setFirstName(e.target.value)} className="" type='text' placeholder='First Name' required/>
                    </div>

                    <div className='flex justify-center w-full'>
                        <Input onChange={(e) => setLastName(e.target.value)} className="" type='text' placeholder='Last Name' />
                    </div>
                </div>
                <div className='w-96'>
                    <div className='my-2'>
                        <Input className={error === "Email is already registered" ? "border-red-500 bg-red-300 text-black" : ""} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email'/>
                    </div>
                    <div className='my-2'>
                        <Input className={error === "Phone no. is already registered" ? "border-red-500 bg-red-300 text-black" : ""} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder='Mobile'/>
                    </div>
                    <div className='my-2'>
                        <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
                    </div>
                    <div className='my-2'>
                        <Button onClick={onClickSignupHandler} type="submit" size={"mine"}>Sign up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}