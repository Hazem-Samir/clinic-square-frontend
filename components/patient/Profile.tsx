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
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react"
import { FormDataHandler } from "@/utils/AuthHandlers"
import { PasswordSchema, PasswordValue, ProfileValue, PatientProfileSchema } from "@/schema/Profile"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Label } from "../ui/label"
import { getAge } from "@/utils/utils"
import { removeUser } from "@/lib/auth"
import { UpdatePassword, UpdateProfile } from "@/lib/patient/clientApi"
import Spinner from "../Spinner"

interface Iimages {
  profilePic: File | string | null;
  license: (File | string)[];
}

interface IProps {
  profile: ProfileValue;
}

export default function DoctorProfileUpdate({ profile }: IProps) {
  const [isOpenUpdateProfile, setIsOpenUpdateProfile] = useState(false)
  const [isOpenUpdatePassword, setIsOpenUpdatePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [images, setImages] = useState<Iimages>({ profilePic: null, license: [] })
  const router = useRouter();


  const form = useForm<ProfileValue>({
    resolver: zodResolver(PatientProfileSchema),
    defaultValues: {
      ...profile,
      profilePic:null,
      dateOfBirth: new Date(profile.dateOfBirth),
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
    if(!data.profilePic){
      delete data.profilePic;
    }
    if(data.email===profile.email){
      delete data.email;
    }
    setIsLoading(true);
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

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const days = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1)

  return (

   
      <div className="container mx-auto flex-grow">
        {isLoading?<Spinner />:
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
                    <Label className="text-lg">Age</Label>
                    <p   className="text-xl mt-1">{getAge(profile.dateOfBirth)}</p>

                  </div>
                  <div>
                    <Label className="text-lg">Gender</Label>
                    <p   className="text-xl mt-1">{profile.gender}</p>

                  </div>
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
            
              
                </div>
                <div className="flex items-center justify-center gap-2">

                <Dialog open={isOpenUpdateProfile} onOpenChange={setIsOpenUpdateProfile}>
      <DialogTrigger asChild>
        <Button>Update Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Doctor Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
                
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField
                  control={form.control}
                  name="profilePic"
                  render={() => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                        <div className="relative w-28 h-20 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={typeof images.profilePic === 'string' ? images.profilePic : images.profilePic instanceof File ? URL.createObjectURL(images.profilePic) : '/placeholder.svg'}
                            alt="Profile"
                            fill
                            style={{objectFit:"cover"}}
                            // className="rounded-full"
                          />
                          </div>
                          <Input
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
                        <Input {...field} />
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
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="p-4 space-y-4 bg-background rounded-lg shadow-lg border border-border space-x-3">
                            <div className="flex justify-between items-center">
                              <Select
                                value={year.toString()}
                                onValueChange={(value) => setYear(parseInt(value))}
                              >
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {years.map((y) => (
                                    <SelectItem key={y} value={y.toString()}>
                                      {y}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                                  className="h-7 w-7"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="w-[100px] text-center font-medium">
                                  {months[month]}
                                </div>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                                  className="h-7 w-7"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                                  {day}
                                </div>
                              ))}
                              {Array.from({ length: new Date(year, month, 1).getDay() }, (_, i) => (
                                <div key={`empty-${i}`} />
                              ))}
                              {days.map((day) => {
                                const date = new Date(year, month, day);
                                const isSelected = field.value && format(field.value, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
                                const isToday = format(new Date(), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
                                return (
                                  <Button
                                    key={day}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      field.onChange(date);
                                    }}
                                    className={cn(
                                      "h-8 w-8 p-0 font-normal",
                                      isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                                      isToday && !isSelected && "border border-primary text-primary",
                                      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    )}
                                  >
                                    {day}
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
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
                            <Input {...field} />
                            {index > 0 && (
                              <Button
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
                            <Input {...field} />
                            {index > 0 && (
                              <Button
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
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendAddress("")}
                >
                  Add Another Address
                </Button>

            
              </div>
            </ScrollArea>
            <Button type="submit" className="w-full">Update Profile</Button>
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>

    <Dialog open={isOpenUpdatePassword} onOpenChange={setIsOpenUpdatePassword}>
      <DialogTrigger asChild>
        <Button>Update Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Doctor Profile</DialogTitle>
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
                        <Input {...field} type="password"/>
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
                        <Input {...field} type="password" />
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
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                

              
              </div>
            </ScrollArea>
            <Button type="submit" className="w-full">Update Password</Button>
          </form>
        </Form>
            <Toaster />
      </DialogContent>
    </Dialog>
    </div>
              </div>
            </CardContent>
          </Card>
}
          <Toaster />
        </div>

  )
}