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

interface testDtails {
  test:{id:string,name:string}
  preparations:string[]
  cost:number
  id:string
  
}
interface ILabReservation {
  lab:{name:string,id:string,porfilePic:string}
  id:string
  state:string
  requestedTests:{testDetails:testDtails,testResult:string[],id:string}[]
  date:string
}


interface AppointmentDetailModalProps  {
  isOpen: boolean
  onClose: () => void
  appointment: ILabReservation | null
  onUpdate: (date:string) => void
}

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
})

export default function LabAppointmentDetailModal({ isOpen, onClose, appointment, onUpdate }: AppointmentDetailModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: '',
    },
  })



  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    if (appointment) {
      onUpdate(values.date)
    }
    onClose()
  }

  if (!appointment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center ">
                <Label htmlFor="name" className="text-right text-lg">
                {appointment.lab.name}
                </Label>
              </div>
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">New Date</FormLabel>
                    <FormControl className="col-span-3">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3" />
                  </FormItem>
                )}
              />
       
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

