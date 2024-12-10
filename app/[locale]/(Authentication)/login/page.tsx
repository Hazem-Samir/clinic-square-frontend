import Medical from "@/public/Medical.jpeg"
import { useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Login from "@/components/Login"
import {   userTypeSchema, userTypeValue } from "@/schema/Essentials"
export default function LoginPage() {

 
  return (

    <div className="flex min-h-screen w-full flex-col lg:flex-row">
    
      <div className="flex flex-1 items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-[350px] space-y-6">
         
          <Login  />
           
        </div>
      </div>
      <div className="hidden lg:block flex-1">
        <Image
          src={Medical}
          alt="Healthcare illustration"
          width={1920}
          height={1080}
          className="h-full w-full "
          style={{objectFit:"cover"}}
        />
      </div>
    </div>
  )
}