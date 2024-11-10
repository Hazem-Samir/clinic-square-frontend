"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { format } from "date-fns"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn, shortName } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CalendarIcon, ChevronLeft, ChevronRight, PlusCircle, X } from "lucide-react"
import { FormDataHandler } from "@/utils/AuthHandlers"
import { PasswordSchema, PasswordValue, LabProfileSchema, ProfileValue } from "@/schema/Profile"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { UpdatePassword, UpdateProfile } from "@/lib/lab/clientApi"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Label } from "../ui/label"
import { getAge } from "@/utils/utils"
import { removeUser } from "@/lib/auth"
import Spinner from "../Spinner"

interface Iimages {
  profilePic: File | string | null;
  license: (File | string)[];
}

interface IProps {
  profile: ProfileValue;
}

export default function LabProfileUpdate({ profile }: IProps) {
  const [isOpenUpdateProfile, setIsOpenUpdateProfile] = useState(false)
  const [isOpenUpdatePassword, setIsOpenUpdatePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<Iimages>({ profilePic: null, license: [] })
  const router = useRouter();


  const form = useForm<ProfileValue>({
    resolver: zodResolver(LabProfileSchema),
    defaultValues: {
      ...profile,
      profilePic:null,
      license:[],
    },
  })

  const passwordForm = useForm<PasswordValue>({
    resolver: zodResolver(PasswordSchema),
    defaultValues:{
      currentPassword:"",
      newPassword:"",
      passwordConfirm:"",
    }
  })
  useEffect(() => {
    setImages({ profilePic: profile.profilePic, license: profile.license })
  }, [profile])

  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control: form.control,
    name: "phoneNumbers",
  })

  const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
    control: form.control,
    name: "address",
  })
  
  async function onSubmitPassword(data: PasswordValue) {
   setIsLoading(true);
    const res = await UpdatePassword(data)
    if (res.success ===true) {
      toast.success(res.message, {
        duration: 2000,
        position: 'bottom-center',
      })
      removeUser();
      router.push("/login");
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }))
    }
    setIsLoading(false);
  
    setIsOpenUpdateProfile(false)
  }
  async function onSubmit(data: ProfileValue) {
    setIsLoading(true);
    if(!data.profilePic){
      delete data.profilePic;
    }
    if(data.email===profile.email){
      delete data.email;
    }
    // setIsLoading(true);
   const formData= FormDataHandler(data);
    const res = await UpdateProfile(formData)
    if (res.success ===true) {
      toast.success(res.message, {
        duration: 2000,
        position: 'bottom-center',
      })
      router.refresh()
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }))
    }
    setIsLoading(false);
  
    setIsOpenUpdateProfile(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'license') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'profile') {
        setImages(prev => ({ ...prev, profilePic: e.target.files![0] }))
        form.setValue('profilePic', e.target.files[0])
      } else {
        const newFiles = Array.from(e.target.files)
        setImages(prev => ({ ...prev, license: [...prev.license, ...newFiles] }))
        form.setValue('license', [...form.getValues('license'), ...newFiles])
      }
    }
  }



  return (

   
      <div className="container mx-auto flex-grow">
          <Card className="w-full border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profile.profilePic} alt={profile.name} />
                    <AvatarFallback>{shortName(profile.name)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-3xl font-bold">{profile.name}</h2>
                    <p className="text-xl text-gray-500">{profile.email}</p>
                    <p className="text-sm text-gray-500">{profile.specialization}</p>
                  </div>
                </div>
                <div className="space-y-6">
                
                  
                 
                  <div>
                    <Label className="text-lg">Address</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.address.map((address, index) => (
                    <p  key={index} className="text-xl mt-1">{address} - </p>

                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-lg">Phone Numbers</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.phoneNumbers.map((phone, index) => (
                    <p  key={index} className="text-xl mt-1">{phone} - </p>

                      ))}
                    </div>
                  </div>
            
                  <div>
                    <Label className="text-lg">License </Label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {profile.license.map((pic, index) => (
                        <Image  key={index} priority src={pic} alt={`License ${index + 1}`} width={192} height={144} className=" h-auto object-cover rounded" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">

                <Dialog open={isOpenUpdateProfile} onOpenChange={setIsOpenUpdateProfile}>
      <DialogTrigger asChild>
        <Button  disabled={isLoading}>Update Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Lab Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
                
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField
                  control={form.control}
                  name="profilePic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                        <div className="relative w-28 h-20 rounded-full overflow-hidden bg-muted">
                          <Image
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={typeof images.profilePic === 'string' ? images.profilePic : images.profilePic instanceof File ? URL.createObjectURL(images.profilePic) : '/placeholder.svg'}
                            alt="Profile"
                            fill
                            style={{objectFit:"cover"}}
                            className="h-auto"
                          />
                          </div>
                          <Input
                          disabled={isLoading}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'profile')}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input  disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input  disabled={isLoading} {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
         

          

               
                {phoneFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`phoneNumbers.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{index === 0 ? "Phone Number" : `Phone Number ${index + 1}`}</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Input  disabled={isLoading} {...field} />
                            {index > 0 && (
                              <Button
                              disabled={isLoading}
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removePhone(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                 disabled={isLoading}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendPhone("")}
                >
                  Add Another Phone Number
                </Button>

                {addressFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`address.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{index === 0 ? "Address" : `Address ${index + 1}`}</FormLabel>
                        
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Input  disabled={isLoading} {...field} />
                            {index > 0 && (
                              <Button
                              disabled={isLoading}
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeAddress(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                 disabled={isLoading}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendAddress("")}
                >
                  Add Another Address
                </Button>

                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Photos</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <ScrollArea className="h-30 w-full rounded-md border">
                            <div className="flex space-x-2 p-2">
                              {images.license.map((pic, index) => (
                                <Image
                                  key={index}
                                  src={pic instanceof File ? URL.createObjectURL(pic) : pic}
                                  alt={`License ${index + 1}`}
                                  width={100}
                                  height={75}
                                  className="rounded  h-auto"
                                />
                              ))}
                               {/* {images.license.map((file, index) => (
                                <Image
                                  key={`new-${index}`}
                                  src={pic instanceof File ? URL.createObjectURL(pic) : pic}
                                  alt={`New License ${index + 1}`}
                                  width={100}
                                  height={75}
                                  className="rounded"
                                />
                              ))} */}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                          <Button  disabled={isLoading} type="button" variant="outline" size="sm" className="text-xs sm:text-sm">
                            <label htmlFor="license" className="flex w-full h-full items-center cursor-pointer">
                              <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              Upload License Photo
                            </label>
                          </Button>
                          <Input
                           disabled={isLoading}
                            id="license"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileChange(e, 'license')}
                            className="hidden"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <Button type="submit" className="w-full">{isLoading?<Spinner/>:"Update Profile"}</Button>
          </form>
        </Form>
        <Toaster />
      </DialogContent>
    </Dialog>

    <Dialog open={isOpenUpdatePassword} onOpenChange={setIsOpenUpdatePassword}>
      <DialogTrigger asChild>
        <Button  disabled={isLoading}>Update Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Lab Password</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...passwordForm}>
                
          <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-8">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4 p-1">
         

                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input  disabled={isLoading}{...field} type="password"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input  disabled={isLoading}{...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  <FormField
                  control={passwordForm.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input  disabled={isLoading} {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                

              
              </div>
            </ScrollArea>
            <Button type="submit" className="w-full">{isLoading?<Spinner/>:"Update Password"}</Button>
          </form>
        </Form>
            <Toaster />
      </DialogContent>
    </Dialog>
    </div>
              </div>
            </CardContent>
          </Card>
        </div>

  )
}