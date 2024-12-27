'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {  File, FileText } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface IDoctorReservation {
  doctor:{name:string,id:string,porfilePic:string,gender:string,specialization:string}
  id:string
  state:string
  report:{diagnose: string|null,requestedTests:string[],results:string[],medicine:string[]}
  date:string
}

interface AppointmentDetailModalProps  {
  isOpen: boolean
  onClose: () => void
  onUpdate: (data:{date:string,files:File[]}) => void
  appointment:IDoctorReservation|null
}



const formSchema = z.object({
  date: z.string().optional(),
  files: z.array(z.custom<File>()).optional(),
}).refine(data => data.date || (data.files && data.files.length > 0), {
  message: "Either date or files must be provided",
  path: ['date'], // This will show the error message on the date field
});

export default function DoctorAppointmentDetailModal({ isOpen, onClose, appointment, onUpdate }: AppointmentDetailModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date:  '',
      files:  [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  })

console.log(appointment)

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    if (appointment) {
      if (values.date || (values.files && values.files.length > 0)) {
        
        onUpdate({
          date: values.date || appointment.date,
          files: values.files || [],
        });

        onClose();
      } else {
        form.setError('date', { 
          type: 'manual', 
          message: 'Either date or files must be provided' 
        });
      }
    }
  }
  if (!appointment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] h-[65vh]">
        <ScrollArea className="h-[calc(65vh-2rem)] pr-4" style={{ overflow: 'auto' }}>
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-8 p-1 pb-8">
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
                   <div className="flex items-center gap-4 ">
                   <Label  className="text-right ">
                  Files
                </Label>
                
                <div className="flex gap-2 p-4 flex-wrap items-center justify-start">
                            {appointment.report.results.map((result, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="flex-shrink-0 flex items-center space-x-2"
                                asChild
                              >
                                <a
                                  href={result}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={`View Result File ${index + 1}`}
                                >
                                  <FileText className="h-4 w-4" />
                                  <span>File {index + 1}</span>
                                </a>
                              </Button>
                             
                           
                            ))}
                          </div>
              </div>
              {appointment.state==="completed"?null:
              <>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4 ">
                    <FormLabel className="text-right">Date</FormLabel>
                    <FormControl className="col-span-3 ">
                      <Input type="date"  {...field} />
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
                          newFiles.forEach((file) => append(file ));
                        }}
                      />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3" />
                  </FormItem>
                )}
              />
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                  <span className="col-start-2 col-span-2">{`File ${index+1}`}</span>
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
              </>
              }
            </div>
            {appointment.state==="completed"?null:
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!form.formState.isValid}>Update</Button>
            </DialogFooter>
}
          </form>
        </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

