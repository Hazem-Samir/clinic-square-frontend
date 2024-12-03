'use client'

import { useState, useRef } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PlusCircle, Edit, Trash2, Send, Plus, X, ChevronLeft, ChevronRight, Upload } from 'lucide-react'
import { AddTest, DeleteTest, RequestTest } from '@/lib/lab/clientApi'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { getUser } from '@/lib/auth'
import Spinner from '../Spinner'
import Image from 'next/image'
import { FormDataHandler, ImageHandler } from '@/utils/AuthHandlers'
import { AddMedicine, DeleteMedicine, RequestMedicine, UpdateStock } from '@/lib/pharmacy/clientApi'
import { IMedicine, IMedicineDetails } from '@/interfaces/Phamacy'
import { MedicineSchema, MedicineValue, NewMedicineSchema, NewMedicineValue } from '@/schema/Pharmacy'
import { UpdateCost } from '@/lib/doctor/clientApi'



interface IProps {
  data: IMedicine[];
  currentPage: number;
  totalPages: number;
  availableMedicines: IMedicineDetails[];
}




export default function MedicineManagement({data, currentPage, totalPages, availableMedicines}: IProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [medicineName, setMedicineName] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEditModalOpen = () => {
    setIsEditOpen(!isEditOpen);
    setMedicineName('')
    if(!isEditOpen){
      resetMedicineForm();
    }
  }

const resetMedicineForm=()=>{
  medicineForm.reset({
    id: "",
    stock: "",
   
  })
}
  const handleAddModalOpen = () => {
    setIsAddOpen(!isAddOpen);
    setMedicineName('')
    if(!isAddOpen){
      resetMedicineForm();
    }
  }

  const handleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen);
    setMedicineName('')
    if(!isAddOpen){
      resetMedicineForm();
    }
  }

  const medicineForm = useForm<MedicineValue>({
    resolver: zodResolver(MedicineSchema),
    defaultValues: {
      id: "",
      stock: "",
    },
  })

  const NewMedicineForm = useForm<NewMedicineValue>({
    resolver: zodResolver(NewMedicineSchema),
    defaultValues: {
      name: "",
      cost: "",
      photo:null,
    },
  })



  async function onSubmit(data: MedicineValue) {
    console.log(data)
    setIsLoading(true);

    const object ={medicine:data.id,stock:data.stock}
    console.log(object)
    const res = await AddMedicine(object)
    if (res.success ===true) {
      toast.success(res.message, {
        duration: 2000,
        position: 'bottom-center',
      })
      router.refresh();
      
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }))
    }
    handleAddModalOpen();
    setIsLoading(false);
  }

  const handleUpdateSubmit = async (data: MedicineValue) => {
    console.log(data)
    setIsLoading(true);

    const res = await UpdateStock({stock:data.stock},data.id)
    if (res.success ===true) {
      toast.success(res.message, {
        duration: 2000,
        position: 'bottom-center',
      })
      router.refresh();
      
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }))
    }
    handleEditModalOpen();
    setIsLoading(false);
  }

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    router.push(`lab/my-medicines?page=${newPage}`);
    setIsLoading(false);
  };

  const handleDeleteTest = async() => {
    setIsLoading(true);
    const {id} = medicineForm.getValues();
    const res = await DeleteMedicine(id);
    router.refresh();
    if (res.success === true) {
      toast.success(res.message, {
        duration: 2000,
        position: 'bottom-center',
      })
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }))
    }
    setIsLoading(false);
    handleDeleteModal();
  }

  const handleRequestTest = async(data:NewMedicineValue) => {
    console.log(data)
    setIsLoading(true);
    const formData=FormDataHandler(data);
          const res = await RequestMedicine(formData);
          if (res.success ===true) {
            toast.success(res.message, {
              duration: 2000,
              position: 'bottom-center',
            })
            router.refresh();
          } else {
            res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
              duration: 2000,
              position: 'bottom-center',
            }))
          }
          setIsLoading(false);
      setIsRequestOpen(false);
    }
  
  

  return (
    <>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">My Tests</h1>
          <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
            <DialogTrigger asChild>
              <Button disabled={isLoading} variant="outline" size="sm" className="w-full sm:w-auto mb-4 sm:mb-0">
                <Send className="mr-2 h-4 w-4" />
                Request New Test
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request New Test</DialogTitle>
                <DialogDescription>
                  Can't find the Medicne you're looking for? Request it here.
                </DialogDescription>
              </DialogHeader>
              <Form {...NewMedicineForm}>
              <form onSubmit={NewMedicineForm.handleSubmit(handleRequestTest)} className="space-y-8">
              <FormField
                  control={NewMedicineForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medicine Name</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             
                <FormField
                  control={NewMedicineForm.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={NewMedicineForm.control}
                  
                name="photo"
                  render={({ field}) => (
                    <FormItem>
              <FormLabel  className="cursor-pointer text-sm text-primary hover:underline">
            Upload Profile Photo
          </FormLabel>
              <FormControl>
                <Input
                disabled={isLoading}
                  type="file"
                  accept="image/*"
                  id="photo"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0])
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
                  )}
                />
            
                <DialogFooter>
                  <Button disabled={isLoading} type="button" variant="outline" onClick={() => {
                    setIsRequestOpen(false)
                  }}>
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">{isLoading?<Spinner/>:"Send Request"}</Button>
                </DialogFooter>
              </form>
            </Form>
        
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {data.map((medicine) => (
            <div key={medicine.id} className="bg-card text-card-foreground rounded-lg  shadow-md transition-all hover:shadow-lg border border-border rounded-md">
              <div className="mb-4 relative w-full h-52">
                <Image 
                  src={medicine.medicine.photo} 
                  alt={medicine.medicine.name} 
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4 pt-0">
                
           
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold">{medicine.medicine.name}</h2>
                <div className="flex space-x-1">
                  <Button
                    disabled={isLoading}
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      medicineForm.reset({
                        id: medicine.id,
                        stock: medicine.stock,
                      })
                      setMedicineName(medicine.medicine.name);
                      setIsEditOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    disabled={isLoading}
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      medicineForm.reset({
                        id: medicine.id,
                      })
                      setMedicineName(medicine.medicine.name);
                      setIsDeleteOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
           
              <p className="text-xl font-bold text-primary mb-2">{medicine.medicine.cost} EGP</p>
              <p className="text-sm text-muted-foreground">Stock: {medicine.stock}</p>
            </div>
            </div>
          ))}
        </div>
        <Dialog open={isAddOpen} onOpenChange={handleAddModalOpen}>
          <DialogTrigger asChild>
            <Button disabled={isLoading} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Test</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Form {...medicineForm}>
              <form onSubmit={medicineForm.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={medicineForm.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medicne Name</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={isLoading}>
                            <SelectValue placeholder="Select a Medicine" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableMedicines.map((medicine) => (
                            <SelectItem key={medicine.id} value={medicine.id}>
                              {medicine.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={medicineForm.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             
            
                <DialogFooter>
                  <Button disabled={isLoading} type="button" variant="outline" onClick={() => {
                    handleAddModalOpen()
                  }}>
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">{isLoading?<Spinner/>:"Add Medicine"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
          <Toaster />
        </Dialog>
        <Dialog open={isEditOpen} onOpenChange={handleEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Test</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Form {...medicineForm}>
              <form onSubmit={medicineForm.handleSubmit(handleUpdateSubmit)} className="space-y-8">
                <FormField
                  control={medicineForm.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={medicineName} disabled={isLoading} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={medicineForm.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>stock</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
             
                <DialogFooter>
                  <Button disabled={isLoading} type="button" variant="outline" onClick={() => {
                    handleEditModalOpen()
                  }}>
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">{isLoading?<Spinner/>:"Save Changes"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Dialog open={isDeleteOpen} onOpenChange={handleDeleteModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the test "{medicineName}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button disabled={isLoading} type="button" variant="outline" onClick={() => {handleDeleteModal()}}>
                Cancel
              </Button>
              <Button disabled={isLoading} variant="destructive" onClick={handleDeleteTest}>{isLoading?<Spinner />:"Delete"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
   
        {totalPages > 0 ?
          <div className="flex justify-center items-center p-4 gap-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              size="icon"
              variant="outline"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0 || isLoading}
              size="icon"
              variant="outline"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div> : null
        }
        <Toaster />
      </div>
    </>
  )
}

