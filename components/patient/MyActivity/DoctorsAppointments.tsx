'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DoctorAppointmentDetailModal from './DoctorAppointmentDetailModal'
import CancelModal from './CancelModal'
import { shortName } from '@/lib/utils'
import { format } from "date-fns"
import { CancelDoctorReservation, CancelReservation, UpdateMyDoctorReservation } from '@/lib/patient/clientApi'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { FormDataHandler } from '@/utils/AuthHandlers'
import Pagination from '@/components/Pagination'



interface IDoctorReservation {
  doctor:{name:string,id:string,porfilePic:string,gender:string,specialization:string,phoneNumbers:string[]}
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

  const router = useRouter();

  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<IDoctorReservation | null>(null)

  const handleCancel = (appointment: IDoctorReservation) => {
    setSelectedAppointment(appointment)
    setCancelModalOpen(true)
  }

  const handleShowDetails = (appointment: IDoctorReservation) => {
    setSelectedAppointment(appointment)
    setDetailModalOpen(true)
  }
  const handlePageChange=(newPage:number)=>{
    router.push(`my-activity?doctorsPage=${newPage}&activeTab=doctors`);
  }
  
  
  const confirmCancel = async() => {
    if (selectedAppointment) {
      const res = await CancelDoctorReservation(selectedAppointment.id);
    if (res.success === true) {
      toast.success(res.message, {
        duration: 3000,
        position: 'top-center',
      });
      router.push(`my-activity?doctorsPage=${currentPage}&activeTab=doctors`);
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 3000,
        position: 'bottom-center',
      }));
    }
    }
    setCancelModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleUpdate = async(data:{date:string,files:File[]}) => {
    let formData;
    if(data.files.length>0){
      formData=FormDataHandler({date:new Date(data.date).toISOString(),"report.results":data.files});
    }
    else {

      formData=FormDataHandler({date:new Date(data.date).toISOString()});
    }

    const res = await UpdateMyDoctorReservation(formData,selectedAppointment.id);
    if (res.success === true) {
      toast.success(res.message, {
        duration: 3000,
        position: 'top-center',
      });
      router.refresh();
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 3000,
        position: 'bottom-center',
      }));
    }
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
              <div className="flex flex-col items-center" >

              <p className="text-sm text-gray-500">State: {appointment.state}</p>
              <p className="text-sm text-gray-500">Date: {format(new Date(appointment.date), 'yyyy-MM-dd') }</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-start gap-2">
            <Button onClick={() => handleShowDetails(appointment)} className="w-full sm:w-auto">Details</Button>
            <Button variant="outline" onClick={() => handleCancel(appointment)} className="w-full sm:w-auto">Cancel</Button>
         <Toaster />
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
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  )
}

