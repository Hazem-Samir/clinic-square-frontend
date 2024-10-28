
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    } from "@/components/ui/dialog"
    import {
      Avatar,
      AvatarFallback,
      AvatarImage,
    } from "@/components/ui/avatar"
    import { Button } from "@/components/ui/button"
    import { File } from "lucide-react"
    import { ScrollArea } from "@/components/ui/scroll-area"
import { EndReservationSchema, EndReservationValues } from "@/schema/DoctorReservation"
import { getAge } from "@/utils/utils"
import { shortName } from "@/lib/utils"
    
interface IProps {
  reservation: EndReservationValues;

}

    export default function MedicalDetails({reservation}:IProps) {
      console.log(reservation)
      const prescriptions = [
        { name: "Amoxicillin", dose: "500mg" },
        { name: "Ibuprofen", dose: "400mg" },
      ]
    
      const tests = ["Blood Test", "X-Ray", "MRI", "CT Scan","Ssa"]
    
      const sentFiles = [
        "Test1",
        "Test2",
        "X-Ray Image.png",
        "Prescription.pdf",
        "Insurance Card.jpg",
        "Allergy Test Results.pdf",
        "Previous Treatment Plan.docx",
      ]
    
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Details</Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:max-w-[425px] max-h-[80vh] p-0">
            <DialogHeader className="px-4 pt-5 pb-4">
              <DialogTitle className="text-lg sm:text-xl">Reservation Details</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(80vh-7rem)] px-4 pb-6">
              <div className="grid gap-4">
                <div className="flex flex-col items-center gap-2 mb-4">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                          <AvatarImage src={reservation.patient.profilePic} alt="Patient" />
                <AvatarFallback>{shortName(reservation.patient.name).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-lg sm:text-2xl font-bold">{reservation.patient.name}</h2>
                    <p className="text-sm text-gray-500">age: {getAge(reservation.patient.dateOfBirth)}</p>
                    
                  </div>
                </div>
                <div>
                <h3 className="mb-2 text-sm sm:text-lg font-semibold">Files Sent by Patient</h3>
                <div className="flex flex-wrap gap-2">
                    {sentFiles.map((file, index) => (
                         <Button  key={index} variant="outline" size="sm" className="text-xs sm:text-sm">
                         <File className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                         View {file}
                       </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-sm sm:text-lg font-semibold">Diagnosis</h3>
                  <p className="ml-1 text-sm">{reservation.report.diagnose ? reservation.report.diagnose  : "No Diagnose"}</p>
                  
                </div>
                <div>
                  <h3 className="mb-2 text-sm sm:text-lg font-semibold">Prescriptions</h3>
                  <ul className="space-y-2">
                    {reservation.report.medicine.length >0 ? (reservation.report.medicine.map((medicine, index) => (
                      <li key={index} className="flex justify-between items-center text-sm">
                        <span>{medicine.name}</span>
                        <span className="text-gray-500">{medicine.dose}</span>
                      </li>
                    ))): <p className="ml-1 text-sm">No Medinces</p>}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm sm:text-lg font-semibold">Required Tests</h3>
                  <ul className="space-y-1">
                    {reservation.report.requestedTests.length >0 ?(reservation.report.requestedTests.map((test, index) => (
                      <li key={index} className="text-sm">{test}</li>
                    ))):<p className="ml-1 text-sm">No Tests Requested</p>}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )
    }