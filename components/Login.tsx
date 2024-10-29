"use client"

import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Medical from "@/public/Medical.jpeg"
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react"
import { ModeToggle } from "./ui/ModeToggle"
import { PatientValue } from "@/schema/Patient"
import { LoginSubmit } from "@/utils/AuthHandlers"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { setUser } from "@/lib/auth"
import Spinner from "./Spinner"


interface IProps {
  role: string;
  onBack: () => void;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

// async function login(data: z.infer<typeof loginSchema>,role:String) {
 
//       data['role']=role;
//       console.log("aaa",data);
//       try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       const response = await res.json();
//       console.log(response.message)
//   if (!res.ok) {

//     if(response.errors?.length>0){

//       return {success:[],errors:response.errors};
//     }
//     // Handle error response
//     return {success:[],errors:response.message};
//         response.errors.forEach(error => {
          
//           console.log(error.msg || 'An unexpected error occurred.');
//         });
//       } else {
//         // Handle successful response

//         return {success:response,errors:[]};
//         // Redirect user to dashboard or other protected page
//       //   router.push('/dashboard');
//       }
//     } catch (err) {
//       return {success:[],errors:err};
//       console.log('An error occurred while logging in. Please try again.');
//       console.error('Login error:', err);
//     } 
// //     finally {
//       // setLoading(false);
// //     }
//   };


export default function Login({ role ,onBack}: IProps) {
  const [isLoading,SetIsLoading]=useState(false);
  const router = useRouter()


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmitHandler=async (data:PatientValue)=>{
    SetIsLoading(true);
    data['role']=role;
    const res= await LoginSubmit(data);
    SetIsLoading(false);
    if(res.success){
      toast.success(res.message,{
        duration: 2000,
        position: 'bottom-center',
      });
      setUser(res.data.data,res.data.token);
      // Cookies.set('user', JSON.stringify(res.data.data), { expires: 7 }) 
      // Cookies.set('token', res.data.token, { expires: 7 }) 
      router.push(`/${role}`)
    }
    else {
      res.message.forEach((err:string) => toast.error( err || 'An unexpected error occurred.',{
        duration: 2000,
        position: 'bottom-center',
      }))
      // res.error.forEach((err:string) => toast.error(err.msg || err || 'An unexpected error occurred.',{
      //   duration: 2000,
      //   position: 'bottom-center',
      // }))
    }
  }
  // const onSubmitHandler=async (data:PatientValue)=>{
  //   const formData=CreateFormData({data,role});
  //  const res= await onSignupSubmit(formData);
  //   if(res.success){
  //     toast.success(res.message,{
  //       duration: 2000,
  //       position: 'bottom-center',
  //     });
  //   }
  //   else {
  //     res.error.forEach((err:string) => toast.error(err.msg || err || 'An unexpected error occurred.',{
  //       duration: 2000,
  //       position: 'bottom-center',
  //     }))
  //   }
  // }
  
  // async function onSubmit(values: z.infer<typeof loginSchema>) {
  //   // console.log(values);
  //   SetIsLoading(true);
  //   const ddd= await login(values,role);
    
  //   console.log(ddd);
  //   SetIsLoading(false);
  //   if(ddd?.errors?.length===0){
  //     toast.success("Logged In",{
  //       duration: 2000,
  //       position: 'bottom-center',
  //     });
  //   }
  //   else{


  //     ddd?.errors?.forEach(error => {
  //       console.log(error)
  //       return toast.error(error.msg || error || 'An unexpected error occurred.',{
  //         duration: 2000,
  //         position: 'bottom-center',
  //       });
  //     });
  //   }
  //   //     console.log("s",ddd);
  //   // Handle login logic here
  // }

  return (
 
     
      <>
      <Button type="button" variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
     
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading}  placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input disabled={isLoading}  type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading} >
                {isLoading? <Spinner />: 'Login'}
              </Button>
            </form>
          </Form>
         
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
          <Toaster />
        
          </>  
   
  )
}