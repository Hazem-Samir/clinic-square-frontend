'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { File, FileText } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Spinner from '@/components/Spinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addDays, format } from "date-fns"

interface IDoctorReservation {
  doctor:{name:string,id:string,porfilePic:string,gender:string,specialization:string,phoneNumbers:string[],  schedule: {
    days: {day: string,startTime: string,endTime: string,limit: string}[]
    cost: number;
  }}
  id:string
  state:string
  report:{diagnose: string|null,requestedTests:string[],results:string[],medicine:string[]}
  date:string

}

interface AppointmentDetailModalProps {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onUpdate: (data:{date:string,files:File[]}) => void
  appointment:IDoctorReservation|null
}

const formSchema = z.object({
  scheduleDay: z.string().min(1, "Please select a schedule day"),
  appointmentDate: z.string().min(1, "Please select an appointment date"),
  files: z.array(z.custom<File>()).optional(),
}).refine(data => data.appointmentDate || (data.files && data.files.length > 0), {
  message: "Either date or files must be provided",
  path: ['appointmentDate'],
});

export default function DoctorAppointmentDetailModal({ isOpen, onClose, appointment, onUpdate, isLoading}: AppointmentDetailModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scheduleDay: '',
      appointmentDate: '',
      files: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  })

  const selectedDay = form.watch('scheduleDay')

  // Generate available dates based on selected schedule day
  const getAvailableDates = (selectedDay: string) => {
    if (!selectedDay) return []
    
    const today = new Date()
    const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      .indexOf(selectedDay.toLowerCase())
    
    const dates: Date[] = []
    let currentDate = new Date()
    
    // Keep looking for dates until we find 5 valid ones
    while (dates.length < 5) {
      if (currentDate.getDay() === dayIndex && currentDate >= today) {
        dates.push(new Date(currentDate))
      }
      currentDate = addDays(currentDate, 1)
    }
    
    return dates
  }

  const availableDates = selectedDay ? getAvailableDates(selectedDay) : []

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    if (appointment) {
      if (values.appointmentDate || (values.files && values.files.length > 0)) {
        onUpdate({
          date: values.appointmentDate || appointment.date,
          files: values.files || [],
        });
      } else {
        form.setError('appointmentDate', { 
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
                {/* Existing doctor info fields */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Doctor</Label>
                  <span id="name">{appointment.doctor.name}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialization" className="text-right">Specialization:</Label>
                  <span id="specialization">{appointment.doctor.specialization}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="diagnosis" className="text-right">Diagnosis:</Label>
                  <span id="diagnosis">{appointment.report.diagnose}</span>
                </div>

                {/* Files section */}
                <div className="flex items-center gap-4">
                  <Label className="text-right">Files</Label>
                  <div className="flex gap-2 p-4 flex-wrap items-center justify-start">
                    {appointment.report.results.map((result, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0 flex items-center space-x-2"
                        asChild
                      >
                        <a href={result} target="_blank" rel="noopener noreferrer" title={`View Result File ${index + 1}`}>
                          <FileText className="h-4 w-4" />
                          <span>File {index + 1}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>

                {appointment.state !== "completed" && (
                  <>
                    {/* Schedule Day Selection */}
                    <FormField
                      control={form.control}
                      name="scheduleDay"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Schedule Day</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl className="col-span-3">
                              <SelectTrigger>
                                <SelectValue placeholder="Select available day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {appointment.doctor.schedule.days.map((schedule) => (
                                <SelectItem key={schedule.day} value={schedule.day}>
                                  {schedule.day} ({schedule.startTime} - {schedule.endTime})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="col-start-2 col-span-3" />
                        </FormItem>
                      )}
                    />

                    {/* Date Selection */}
                    {selectedDay && (
                      <FormField
                        control={form.control}
                        name="appointmentDate"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-4">
                            <FormLabel className="text-right">Available Dates</FormLabel>
                            <div className="col-span-3 space-y-4">
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select from available dates" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableDates.map((date) => (
                                    <SelectItem 
                                      key={date.toISOString()} 
                                      value={date.toISOString()}
                                    >
                                      {format(date, 'EEEE, MMMM d, yyyy')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <p className="text-sm text-muted-foreground">
                                Showing next 5 available {selectedDay} appointments
                              </p>
                            </div>
                            <FormMessage className="col-start-2 col-span-3" />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* File Upload Fields */}
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
                              disabled={isLoading}
                              onChange={(e) => {
                                const newFiles = Array.from(e.target.files || []);
                                newFiles.forEach((file) => append(file));
                              }}
                            />
                          </FormControl>
                          <FormMessage className="col-start-2 col-span-3" />
                        </FormItem>
                      )}
                    />

                    {/* Uploaded Files List */}
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
                )}
              </div>

              {appointment.state !== "completed" && (
                <DialogFooter>
                  <Button disabled={isLoading} type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!form.formState.isValid || isLoading}>
                    {isLoading ? <Spinner /> : "Update"}
                  </Button>
                </DialogFooter>
              )}
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

