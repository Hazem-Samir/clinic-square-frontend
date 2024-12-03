'use client'

import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ImageHandler } from '@/utils/AuthHandlers'
import { PlusCircle, X, File } from 'lucide-react'
import Link from 'next/link'

type Appointment = {
  id: string
  doctorName: string
  doctorPhoto: string
  specialization: string
  date: string
  files?: File[]
}

type AppointmentDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedAppointment: Appointment) => void
  appointment:IDoctorReservation|null
}

interface IDoctorReservation {
  doctor:{name:string,id:string,porfilePic:string,gender:string,specialization:string}
  id:string
  state:string
  report:{diagnose: string|null,requestedTests:string[],results:string[],medicine:string[]}
  date:string
}


const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  files: z.array(z.custom<File>()).optional(),
})

export default function DoctorAppointmentDetailModal({ isOpen, onClose, appointment, onUpdate }: AppointmentDetailModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date:  '',
      files:  [],
    },
  })

  console.log(appointment)
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  })



  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    if (appointment) {
     console.log(values)
    onClose()
  }
  }
  if (!appointment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-8 p-1">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Doctor
                </Label>
                <span id="name">{appointment.doctor.name}</span>

              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialization" className="text-right">
                  Specialization:
                </Label>
                <span id="specialization">{appointment.doctor.specialization}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialization" className="text-right">
                  Files Sent
                </Label>
                  <div className="flex flex-wrap gap-2">
                    {appointment.report.results.length>0? appointment.report.results.map((index,result)=>{
 <Link href={result} index={index} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm h-9 rounded-md px-3" >
 <File className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
 View File {index}
</Link>
                    }):"No Files"}
                   

                  </div>
                </div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Date</FormLabel>
                    <FormControl className="col-span-3 ">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="files"
                render={() => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Upload Files</FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => {
                          const newFiles = Array.from(e.target.files || []);
                          newFiles.forEach((file) => append({ file }));
                        }}
                      />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3" />
                  </FormItem>
                )}
              />
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                  <span className="col-start-2 col-span-2">{field.file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

