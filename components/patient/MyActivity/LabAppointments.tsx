'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CancelModal from './CancelModal'
import LabAppointmentDetailModal from './LabAppointmentDetailModal'

type LabAppointment = {
  id: string
  labName: string
  labPhoto: string
  tests: { name: string; price: number }[]
  date: string
}

export default function LabAppointments() {
  const [appointments, setAppointments] = useState<LabAppointment[]>([
    { 
      id: '1', 
      labName: 'Central Lab', 
      labPhoto: '/placeholder.svg', 
      tests: [{ name: 'Blood Test', price: 50 }, { name: 'Urine Test', price: 30 }],
      date: '2023-06-18' 
    },
    { 
      id: '2', 
      labName: 'City Medical Lab', 
      labPhoto: '/placeholder.svg', 
      tests: [{ name: 'X-Ray', price: 100 }],
      date: '2023-06-25' 
    },
  ]);
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<LabAppointment | null>(null)

  const handleCancel = (appointment: LabAppointment) => {
    setSelectedAppointment(appointment)
    setCancelModalOpen(true)
  }

  const confirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(appointments.filter(a => a.id !== selectedAppointment.id))
    }
    setCancelModalOpen(false)
  }

  
    const handleShowDetails = (appointment: Appointment) => {
      setSelectedAppointment(appointment)
      setDetailModalOpen(true)
    }

  
    const handleUpdate = (updatedAppointment: Appointment) => {
      setAppointments(appointments.map(a => a.id === updatedAppointment.id ? updatedAppointment : a))
      setDetailModalOpen(false)
      setSelectedAppointment(null)
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <Avatar>
                  <AvatarImage src={appointment.labPhoto} alt={appointment.labName} />
                  <AvatarFallback>{appointment.labName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{appointment.labName}</h3>
                  <p className="text-sm text-gray-500">Date: {appointment.date}</p>
                </div>
              </div>
            </div>
            <div>
                  <div className="flex justify-between">

              <h4 className="font-semibold mb-2">Tests:</h4>
              <h4 className="font-semibold mb-2">Price</h4>
                    </div>
              <ul className="space-y-1">
                {appointment.tests.map((test, index) => (
                      <li key={index} className="flex justify-between">
                    <span>{test.name}</span>
                    <span>${test.price}</span>
                  </li>
                ))}
              </ul>
                </div>
                <div className="mt-4 text-right font-semibold">
              Total: ${100}
            </div>
          </CardContent>
          <CardFooter>
        
            <Button onClick={() => handleShowDetails(appointment)} className="w-full sm:w-auto">Details</Button>
            <Button variant="outline" onClick={() => handleCancel(appointment)} className="w-full sm:w-auto">Cancel</Button>
            {/* <Button variant="outline" onClick={() => handleCancel(appointment)} className="w-full sm:w-auto">Cancel</Button> */}
          </CardFooter>
        </Card>
      ))}
      <CancelModal 
        isOpen={cancelModalOpen} 
        onClose={() => setCancelModalOpen(false)}
        onConfirm={confirmCancel}
        itemName="lab appointment"
      />
          <LabAppointmentDetailModal  
            isOpen={detailModalOpen}
            onClose={handleCloseDetailModal}
            appointment={selectedAppointment}
            onUpdate={handleUpdate}
            />
    </div>
  )
}

