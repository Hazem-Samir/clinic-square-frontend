import { useState } from "react"
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
import Image from "next/image"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function ShowReservation({ size = "default" }) {
      const [isOpen, setIsOpen] = useState(false)
      const [prescriptions, setPrescriptions] = useState([{ name: "", dose: "" }])
      const [tests, setTests] = useState([""])
      const [showDateDialog, setShowDateDialog] = useState(false)
      const [consultationDate, setConsultationDate] = useState("")

  const addPrescription = () => 
    setPrescriptions([...prescriptions, { name: "", dose: "" }])

  const removePrescription = (index: number) =>
    setPrescriptions(prescriptions.filter((_, i) => i !== index))

  const addTest = () => setTests([...tests, ""])

  const removeTest = (index: number) =>
    setTests(tests.filter((_, i) => i !== index))

  const handleEndReservation = () => console.log("Reservation ended")

  const handleSetConsultation = () => setShowDateDialog(true)


  const handleDateSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("New consultation date set:", consultationDate)
      setShowDateDialog(false)
      setIsOpen(false) // Close the main dialog
    }

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>View Reservation</Button>
      </DialogTrigger>
      <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Reservation Details</DialogTitle>
        
        </DialogHeader>
        <div className="grid gap-2 sm:gap-4 py-2 sm:py-4">
          <div className="flex flex-col items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src="/avatars/04.png" alt="Avatar" />
              <AvatarFallback>WK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center">

            <h2 className="text-lg sm:text-2xl font-bold">John Doe</h2>
            <p >age: 39</p>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm sm:text-lg font-semibold">Files Sent by Patient</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <File className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                View File 1
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <File className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                View File 2
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm sm:text-lg font-semibold">Prescriptions</h3>
            {prescriptions.map((prescription, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                <Input
                  placeholder="Medication name"
                  value={prescription.name}
                  onChange={(e) => {
                    const newPrescriptions = [...prescriptions]
                    newPrescriptions[index].name = e.target.value
                    setPrescriptions(newPrescriptions)
                  }}
                  className="w-full sm:w-1/2 text-xs sm:text-sm"
                />
                <Input
                  
                  placeholder="Dose"
                  value={prescription.dose}
                  onChange={(e) => {
                    const newPrescriptions = [...prescriptions]
                    newPrescriptions[index].dose = e.target.value
                    setPrescriptions(newPrescriptions)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === '.' || e.key === '-' || e.key === 'e') {
                      e.preventDefault()
                    }
                  }}
                  className="w-full sm:w-1/3 text-xs sm:text-sm"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePrescription(index)}
                  className="p-1 sm:p-2"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addPrescription} variant="outline" size="sm" className="text-xs sm:text-sm">
              <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add Prescription
            </Button>
          </div>
          <div>
            <h3 className="mb-2 text-sm sm:text-lg font-semibold">Required Tests</h3>
            {tests.map((test, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="Test name"
                  value={test}
                  onChange={(e) => {
                    const newTests = [...tests]
                    newTests[index] = e.target.value
                    setTests(newTests)
                  }}
                  className="w-full text-xs sm:text-sm"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTest(index)}
                  className="p-1 sm:p-2"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addTest} variant="outline" size="sm" className="text-xs sm:text-sm">
              <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add Test
            </Button>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button onClick={handleEndReservation} variant="destructive" className="w-full sm:w-auto text-xs sm:text-sm">
            End Reservation
          </Button>
          <Button onClick={handleSetConsultation} className="w-full sm:w-auto text-xs sm:text-sm">
            Set Consultation
          </Button>
        </DialogFooter>
      </DialogContent>
      <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
        <DialogContent className="w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Set New Consultation Date</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDateSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right text-xs sm:text-sm">
                  Date
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={consultationDate}
                  onChange={(e) => setConsultationDate(e.target.value)}
                  className="col-span-3 text-xs sm:text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto text-xs sm:text-sm">Set Date</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}