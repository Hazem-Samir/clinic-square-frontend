'use client'

import { useState } from "react"
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X, File } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { PatientValue } from "@/schema/Patient"
import { EndReservationSchema, EndReservationValues } from "@/schema/DoctorReservation"
import Spinner from "../Spinner"
import toast, { Toaster } from 'react-hot-toast';
import { getToken } from "@/lib/auth"
import { getAge } from "@/utils/utils"
import { useRouter } from 'next/navigation'
import { shortName } from "@/lib/utils"

interface IProps {
  size: string;
  patient: PatientValue;
  RID: string;
  currentPage: number;
  currentDate?: string;
}




export default function ShowReservation({ size = "default", patient,RID,currentPage,currentDate }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [showEndReservationDialog, setShowEndReservationDialog] = useState(false)
  const [showSetConsultationDialog, setShowSetConsultationDialog] = useState(false)
  // const [treatment, setTreatment] = useState(EndReservationSchema);

  const { register, control, handleSubmit, formState: { errors } ,reset ,getValues} = useForm<EndReservationValues>({
    resolver: zodResolver(EndReservationSchema),
    defaultValues: {
      diagnose: "",
      // medicine:[],
      // requestedTests:[],
      // consultationDate: null,
    },
  })
  const handleConsultaionModal=()=>{
    const currentValues = getValues();
    reset({
      ...currentValues,
      consultationDate: null,
    })
    setShowSetConsultationDialog(!showSetConsultationDialog)
  }
const handleResrvationModal=()=>{
  reset({
    diagnose: "",
    medicine:[],
    requestedTests:[],
    consultationDate: null,
  })
  setIsOpen(!isOpen)
}
  const { fields: medicineFields, append: appendMedicine, remove: removeMedicine } = useFieldArray({
    control,
    name: "medicine",
  })

  const { fields: testFields, append: appendTest, remove: removeTest } = useFieldArray({
    control,
    name: "requestedTests",
  })



  const handleSetConsultation = () => {
    setShowSetConsultationDialog(true)
  }

  const onSubmit: SubmitHandler<EndReservationValues> = async () => {
   
    setShowEndReservationDialog(true);

    
  }

  const onSubmitConsultationDate: SubmitHandler<EndReservationValues> = async (data:EndReservationValues) => {
    setIsLoading(true);
    const {consultationDate,...rest}=data;
    const consultaion={report:{...rest},date:new Date(consultationDate).toISOString(),state:'consultaion'};
    const token = getToken();
    try {
      const res = await fetch(`/api/doctor/reservations?ID=${RID}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultaion),
      })
      setIsLoading(false);

      if (res.ok) {
        setShowEndReservationDialog(false)  
        setIsOpen(false)
        reset({
          diagnose: "",
          medicine:[],
          requestedTests:[],
          consultationDate: null,
        })
        // toast.success('Reservation Updated Successfully',{
        //   duration: 2000,
        //   position: 'bottom-center',
        // });
        router.push(`doctor?page=${currentPage}&date=${currentDate}`)
      } else {
        res.message.forEach((err:string) => toast.error( err || 'An unexpected error occurred.',{
          duration: 2000,
          position: 'bottom-center',
        }))
      }
    } catch (error) {
      console.error('Error updating reservation:', error)
    }

  }


  const handleEndReservation = async() => {
    setIsLoading(true);
    const currentValues = getValues();
    const {consultationDate,...rest}=currentValues;
    const treatment={report:{...rest},state:'completed'};

    const token = getToken();
    try {
      const res = await fetch(`/api/doctor/reservations?ID=${RID}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(treatment),
      })
      setIsLoading(false);

      if (res.ok) {
        setShowEndReservationDialog(false)  
        setIsOpen(false)
        reset({
          diagnose: "",
          medicine:[],
          requestedTests:[],
          consultationDate: null,
        })
        // toast.success('Reservation Updated Successfully',{
        //   duration: 2000,
        //   position: 'bottom-center',
        // });
        router.push(`doctor?page=${currentPage}&date=${currentDate}`)
      } else {
        res.message.forEach((err:string) => toast.error( err || 'An unexpected error occurred.',{
          duration: 2000,
          position: 'bottom-center',
        }))
      }
    } catch (error) {
      console.error('Error updating reservation:', error)
    }

  }


  const handleCancelConsultationDate = () => {
    const currentValues = getValues();
    reset({
      ...currentValues,
      consultationDate: null,
    })
    setShowSetConsultationDialog(false)
  }
  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
        <Dialog open={isOpen} onOpenChange={handleResrvationModal}>
        <DialogTrigger asChild>
          <Button disabled={isLoading} variant="outline" onClick={() => setIsOpen(true)}>View Reservation</Button>
        </DialogTrigger>
        <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-w-3xl overflow-y-auto">
        <div className="custom-scrollbar overflow-y-auto max-h-[calc(90vh-4rem)] sm:max-h-[calc(100vh-8rem)] pr-4 p-1 ">

          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Reservation Details</DialogTitle>
            <DialogDescription>
            
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2 sm:gap-4 py-2 sm:py-4 space-y-2">
              <div className="flex flex-col items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                <AvatarImage src={patient.profilePic} alt={patient.name} />
                <AvatarFallback>{shortName(patient.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <h2 className="text-lg sm:text-2xl font-bold">{patient.name}</h2>
                  <p>age: {getAge(patient.dateOfBirth)}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm sm:text-lg font-semibold">Files Sent by Patient</h3>
                <div className="flex flex-wrap gap-2">
                  <Button disabled={isLoading} variant="outline" size="sm" className="text-xs sm:text-sm">
                    <File className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    View File 1
                  </Button>
                  <Button disabled={isLoading} variant="outline" size="sm" className="text-xs sm:text-sm">
                    <File className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    View File 2
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm sm:text-lg font-semibold">diagnose</h3>
                <div  className="space-y-2 mb-4">
                <Textarea
                aria-describedby="diagnose field"
                disabled={isLoading}
                  placeholder="Enter diagnose"
                  {...register("diagnose")}
                  className="w-full text-xs sm:text-sm"
                />
                {errors.diagnose && (
                  <p className="text-red-500 text-sm">{errors.diagnose.message}</p>
                )}
              </div>
              <div  >
                <h3 className="mb-2 text-sm sm:text-lg font-semibold">Medicine</h3>
                <div  >

                {medicineFields.map((field, index) => (
                  <div key={field.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                    <Input
                    disabled={isLoading}
                      placeholder="Medication name"
                      {...register(`medicine.${index}.name`)}
                      className="w-full sm:w-1/2 text-xs sm:text-sm"
                    />
                    <Input
                    disabled={isLoading}
                      placeholder="Dose"
                      {...register(`medicine.${index}.dose`)}
                      className="w-full sm:w-1/3 text-xs sm:text-sm"
                    />
                    <Button
                    disabled={isLoading}
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMedicine(index)}
                      className="p-1 sm:p-2"
                      >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                ))}
                {errors.medicine && (
                  <p className="text-red-500 text-sm">{errors.medicine.message}</p>
                )}
                </div>
                </div>
                <Button disabled={isLoading} type="button" onClick={() => appendMedicine({ name: "", dose: "" })} variant="outline" size="sm" className="text-xs sm:text-sm">
                  <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Add Prescription
                </Button>
              </div>
              <div >
                <h3 className="mb-2 text-sm sm:text-lg font-semibold">Need Tests</h3>
                <div >

                {testFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <Input
                    disabled={isLoading}
                      placeholder="Test name"
                      {...register(`requestedTests.${index}`)}
                      className="w-full text-xs sm:text-sm"
                    />
                    <Button
                    disabled={isLoading}
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTest(index)}
                      className="p-1 sm:p-2"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                ))}
                {errors.requestedTests && (
                  <p className="text-red-500 text-sm">{errors.requestedTests.message}</p>
                )}
                </div>
                <Button disabled={isLoading} type="button" onClick={() => appendTest("")} variant="outline" size="sm" className="text-xs sm:text-sm">
                  <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Add Test
                </Button>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              {/* <Button type="button" onClick={() => setShowEndReservationDialog(true)} variant="destructive" className="w-full sm:w-auto text-xs sm:text-sm">
                End Reservation
              </Button> */}
              <Button disabled={isLoading} type="button" onClick={handleSetConsultation} className="w-full sm:w-auto text-xs sm:text-sm">
                Set Consultation
              </Button>
              {/* <Button type="submit" className="w-full sm:w-auto text-xs sm:text-sm">
                Save Changes
              </Button> */}
              <Button  disabled={isLoading} type="submit" variant="destructive" className="w-full sm:w-auto text-xs sm:text-sm">
              End Reservation
            </Button>
            </DialogFooter>
          </form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEndReservationDialog} onOpenChange={setShowEndReservationDialog}>
        <DialogContent className="w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">End Reservation</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this reservation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button disabled={isLoading} type="button"  onClick={() => setShowEndReservationDialog(false)} variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleEndReservation} variant="destructive" className="w-full sm:w-auto text-xs sm:text-sm">
            {isLoading ? <Spinner />:"End Reservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSetConsultationDialog} onOpenChange={handleConsultaionModal}>
        <DialogContent className="w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Set New Consultation Date</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitConsultationDate)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="consultationDate" className="text-right text-xs sm:text-sm">
                  Date
                </Label>
                <Input
                disabled={isLoading}
                  id="consultationDate"
                  type="date"
                  {...register("consultationDate")}
                  className="col-span-3 text-xs sm:text-sm"
                />
              </div>
              {errors.consultationDate && (
                <p className="text-red-500 text-sm">{errors.consultationDate.message}</p>
              )}
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button disabled={isLoading} type="button" onClick={handleCancelConsultationDate} variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit" className="w-full sm:w-auto text-xs sm:text-sm">{isLoading ? <Spinner />:"Set Date"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />

    </>
  )

}