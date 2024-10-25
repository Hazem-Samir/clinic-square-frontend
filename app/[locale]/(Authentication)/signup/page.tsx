"use client"
import Medical from "@/public/Medical.jpeg"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Upload } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {   userTypeSchema, userTypeValue } from "@/schema/Essentials"
import { onSignupSubmit } from "@/utils/AuthHandlers"
import Pateint from "@/components/Singup-Forms/Pateint"
import Doctor from "@/components/Singup-Forms/Doctor/Doctor"
import { ArrowLeft } from "lucide-react"
import Patient from "@/components/Singup-Forms/Patient"
import Lab from "@/components/Singup-Forms/Lab/Lab"
import Pharmacy from "@/components/Singup-Forms/Pharmacy"




export default function SignupPage() {
  const [step, setStep] = useState(1);
  // const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const userTypeForm = useForm<userTypeValue>({
    resolver: zodResolver(userTypeSchema),
  })
// const defaultValues: Partial<signupValue>={
//   firstName: "hazem",
//   lastName: "samir",
//   email: "hazem@gmail.com",
//   password: "123456789",
//   confirmPassword:"123456789",
// }
  // const signupForm = useForm<signupValue>({
  //   resolver: zodResolver(signupSchema),
  //   // defaultValues,
  //   // mode:'onChange'
  // })

  const onUserTypeSubmit = (data: userTypeValue) => {
    setStep(2)
  }

  // const onSignupSubmit = async (data: z.infer<typeof signupSchema>) => {
  //   const formData = new FormData()

  //   // Add user type
  //   formData.append("userType", userTypeForm.getValues().userType)

  //   // Add signup form data
  //   Object.entries(data).forEach(([key, value]) => {
  //     formData.append(key, value)
  //   })
  //   // Add profile photo if it exists
  //   if (profilePhoto) {
  //     formData.append("profilePhoto", profilePhoto)
  //   }

  //   // Log the FormData (for demonstration purposes)
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value}`)
  //   }

  //   // Here you would typically send the formData to your API
  //   // For example:
  //   // try {
  //   //   const response = await fetch('/api/signup', {
  //   //     method: 'POST',
  //   //     body: formData,
  //   //   })
  //   //   const result = await response.json()
  //   //   console.log(result)
  //   // } catch (error) {
  //   //   console.error('Error:', error)
  //   // }
  // }

  // const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setProfilePhoto(e.target.files[0])
  //   }
  // }
  const handleBack = () => {
    setStep(1);
  }
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="flex flex-1 items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-[350px] space-y-6">
          {step === 1 ? (
            <Form {...userTypeForm}>
              <form onSubmit={userTypeForm.handleSubmit(onUserTypeSubmit)} className="space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold">Sign Up</h1>
                  <p className="text-balance text-muted-foreground">
                    Choose your account type to get started
                  </p>
                </div>
                <FormField
                  control={userTypeForm.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          {["Doctor", "Patient", "Lab", "Pharmacy"].map((type) => (
                            <FormItem key={type}>
                              <FormControl>
                                <RadioGroupItem
                                  value={type.toLowerCase()}
                                  id={type.toLowerCase()}
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={type.toLowerCase()}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                {type}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </Form>
          ) : (
            <>
              {userTypeForm.getValues().userType === 'doctor' ? (
                <Doctor onBack={handleBack} role={userTypeForm.getValues().userType} />
              ) : userTypeForm.getValues().userType === 'patient' ? (
                <Patient onBack={handleBack} role={userTypeForm.getValues().userType} />
              ): userTypeForm.getValues().userType === 'lab' ? (
                <Lab onBack={handleBack} role={userTypeForm.getValues().userType} />
              ) : userTypeForm.getValues().userType === 'pharmacy' ? (
                <Pharmacy onBack={handleBack} role={userTypeForm.getValues().userType} />
              ) : (
                <div>Who Are You {userTypeForm.getValues().userType}</div>
              )}
            </>
          )}
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