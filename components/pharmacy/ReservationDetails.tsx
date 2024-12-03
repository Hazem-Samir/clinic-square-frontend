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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EndReservationValues } from "@/schema/DoctorReservation"
import { getAge } from "@/utils/utils"
import { shortName } from "@/lib/utils"
import Link from "next/link"

interface IProps {
  reservation: EndReservationValues;
}

export default function ReservationDetails({ reservation }: IProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button disabled={isLoading} variant="outline" onClick={() => setIsOpen(true)}>View Order</Button>
    </DialogTrigger>
    <DialogContent className="w-full sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-xl">Order Details</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
          <div className="grid gap-4">
         
          <div className="flex flex-col items-center gap-2 mb-4">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                      <AvatarImage src={order.patient.profilePic} alt="Patient" />
            <AvatarFallback>{shortName(order.patient.name)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-lg sm:text-2xl font-bold">{order.patient.name}</h2>
         
                
              </div>
            <p className="text-sm text-gray-500 mb-2">Payment Method: {order.paymentMethod}</p>
            </div>
            <div>
           
              <ul className="space-y-2 flex flex-col justify-between  ">
              <li  className="flex justify-between items-center text-md">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                </li>
                {order.medicines.length >0 ? (order.medicines.map((medicine, index) => (
                  <li key={index} className="flex justify-between items-center text-sm ">
                    <span >{medicine.medicineId.name}</span>
                    <span>{medicine.price}</span>
                    <span className="text-gray-500">{medicine.quantity}</span>
                  </li>
                ))): <p className="ml-1 text-sm">No Products</p>}
              </ul>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Total Cost</span>
              <span>{order.totalCost}</span>
            </div>
            {/* <div>
              <h3 className="mb-2 text-sm sm:text-lg font-semibold">Required Tests</h3>
              <ul className="space-y-1">
                {reservation.report.requestedTests.length >0 ?(reservation.report.requestedTests.map((test, index) => (
                  <li key={index} className="text-sm">{test}</li>
                ))):<p className="ml-1 text-sm">No Tests Requested</p>}
              </ul>
            </div> */}
          </div>
      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Button disabled={isLoading} type="button" onClick={() => setIsOpen(false)} variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={() => setShowEndReservationDialog(true)} variant="destructive" className="w-full sm:w-auto text-xs sm:text-sm">
          {isLoading ? <Spinner /> : "Mark Delivered"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  )
}