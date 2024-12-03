'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DoctorAppointmentDetailModal from './DoctorAppointmentDetailModal'
import CancelModal from './CancelModal'
import { shortName } from '@/lib/utils'
import { format } from "date-fns"

interface Appointment  {
  id: string
  doctorName: string
  doctorPhoto: string
  specialization: string
  date: string
}

interface IDoctorReservation {
  doctor:{name:string,id:string,porfilePic:string,gender:string,specialization:string}
  id:string
  state:string
  report:{diagnose: string|null,requestedTests:string[],results:string[],medicine:string[]}
  date:string
}

interface IProps {
  currentPage:number
   totalPages:number
  appointments:IDoctorReservation[];
}

export default function DoctorAppointments({appointments,currentPage,totalPages}:IProps) {
  // const [appointments, setAppointments] = useState<Appointment[]>([
  //   { id: '1', doctorName: 'Dr. Smith', doctorPhoto: '/placeholder.svg', specialization: 'Cardiologist', date: '2023-06-15' },
  //   { id: '2', doctorName: 'Dr. Johnson', doctorPhoto: '/placeholder.svg', specialization: 'Dermatologist', date: '2023-06-20' },
  // ])
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const handleCancel = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setCancelModalOpen(true)
  }

  const handleShowDetails = (appointment: IDoctorReservation) => {
    setSelectedAppointment(appointment)
    setDetailModalOpen(true)
  }

  const confirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(appointments.filter(a => a.id !== selectedAppointment.id))
    }
    setCancelModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleUpdate = (updatedAppointment: Appointment) => {
    console.log(updatedAppointment)
    setDetailModalOpen(false)
  }

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false)
    setSelectedAppointment(null)
  }

  return (
    <div className="grid gap-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="w-full">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <Avatar>
                  <AvatarImage src={appointment.doctor.porfilePic} alt={appointment.doctor.name} />
                  <AvatarFallback>{shortName(appointment.doctor.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{appointment.doctor.name}</h3>
                  <p className="text-sm text-gray-500">{appointment.doctor.specialization}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Date: {format(new Date(appointment.date), 'yyyy-MM-dd') }</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-start gap-2">
            <Button onClick={() => handleShowDetails(appointment)} className="w-full sm:w-auto">Details</Button>
            <Button variant="outline" onClick={() => handleCancel(appointment)} className="w-full sm:w-auto">Cancel</Button>
          </CardFooter>
        </Card>
      ))}
      <CancelModal
        isOpen={cancelModalOpen} 
        onClose={() => {
          setCancelModalOpen(false)
          setSelectedAppointment(null)
        }}
        onConfirm={confirmCancel}
        itemName="appointment"
      />
      {selectedAppointment && (
        <DoctorAppointmentDetailModal 
          isOpen={detailModalOpen}
          onClose={handleCloseDetailModal}
          appointment={selectedAppointment}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

