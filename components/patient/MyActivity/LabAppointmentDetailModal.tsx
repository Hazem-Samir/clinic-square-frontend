'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { FileText } from 'lucide-react'

interface TestDetails {
  test: { id: string; name: string }
  preparations: string[]
  cost: number
  id: string
}

interface ILabReservation {
  lab: { name: string; id: string; porfilePic: string }
  id: string
  state: string
  requestedTests: { testDetails: TestDetails; testResult: string[]; id: string }[]
  date: string
}

interface AppointmentDetailModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: ILabReservation | null
  onUpdate: (date: string) => void
}

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
})

export default function LabAppointmentDetailModal({ isOpen, onClose, appointment, onUpdate }: AppointmentDetailModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: appointment?.date || '',
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
    <Dialog  open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
      <ScrollArea className="h-[calc(70vh-2rem)] pr-4" style={{ overflow: 'auto' }}>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Appointment Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={appointment.lab.porfilePic} alt={appointment.lab.name} />
              <AvatarFallback>{appointment.lab.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{appointment.lab.name}</h2>
              {/* <p className="text-sm text-gray-500">{ appointment.date}</p> */}
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6">
              {appointment.state==="completed"?null:<FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />}
              <div>
                <Label className="text-lg font-semibold mb-2 block">Test Results</Label>
                <ScrollArea className="h-[300px] w-full rounded-md border">
                  <div className="p-4 space-y-4">
                    {appointment.requestedTests.map((test) => (
                      <Card key={test.id}>
                        <CardHeader>
                          <CardTitle>{test.testDetails.test.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {test.testResult.map((result, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                                asChild
                              >
                                <a
                                  href={result}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={`View Result File ${index + 1}`}
                                >
                                  <FileText className="h-4 w-4" />
                                  <span>Result {index + 1}</span>
                                </a>
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              {appointment.state==="completed"?null:
              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Update Appointment</Button>
              </DialogFooter>
}
            </form>
          </Form>
        </div>
        </ScrollArea>

      </DialogContent>
    </Dialog>
  )
}

