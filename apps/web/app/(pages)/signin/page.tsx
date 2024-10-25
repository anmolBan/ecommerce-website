"use client"
import { Button } from '@/components/ui/button'
import { ButtonWithIcon } from '@/components/ui/buttonWithMailIcon'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { FcGoogle } from 'react-icons/fc'

type Props = {}

export default function ({}: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function onClickSignInButtonHandler(){
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if(res?.error){
      console.log(res.error);
      setError(res.error);
    } else{
      router.push("/");
    }
  }

  
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <div className='text-3xl font-bold mb-3'>
        Log into your accout
      </div>
      <div className='text-sm'>
        Enter your email and password below to log into your account
      </div>
      <div className='w-96 my-4'>
        <div className='my-2'>
          <Input className={error === "Incorrect username or password" ? "border-red-500 bg-red-200" : ""} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email'/>
        </div>
        <div className='my-2'>
          <Input className={error === ("Incorrect username or password" || "Incorrect password") ? "border-red-500 bg-red-200" : ""} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
        </div>
        <div className='my-2'>
          <Button onClick={onClickSignInButtonHandler} type="submit" size={"mine"}>Sign in with Email</Button>
        </div>
      </div>
      <div className="w-96 flex items-center justify-center mb-6">
        <div className="h-px bg-slate-300 w-full"></div>
        <span className="px-3 text-gray-300 text-xs whitespace-nowrap">OR CONTINUE WITH</span>
        <div className="h-px bg-gray-300 w-full"></div>
      </div>
      <div className='w-96'>
        {/* <ButtonWithIcon onClick={signIn}/> */}
        <Button onClick={(e) => {
          e.preventDefault();
          signIn("google", { callbackUrl: "/" });
        }} variant={"outline"} size={"mine"}>
          <FcGoogle className="mr-2 h-5 w-5" />
          Login with Google
        </Button>
      </div>
    </div>
  )
}