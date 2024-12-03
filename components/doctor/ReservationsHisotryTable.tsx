'use client'

import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/ui/SearchBar"
import MedicalDetails from "./MedicalDetails"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { EndReservationValues } from '@/schema/DoctorReservation'
import { shortName } from '@/lib/utils'
import Pagination from '../Pagination'


type IProps = {
  reservations: EndReservationValues[];
  currentPage: number
  totalPages: number
  numberOfResults:number;
}

export default function ReservationsHistoryTable({ 
  reservations, 
  currentPage, 
  totalPages,
  numberOfResults
}: IProps) {
  const router = useRouter()
console.log(reservations.length)
  const handlePageChange = (newPage: number) => {
    router.push(`reservations-history?page=${newPage}`)
  }
  return (
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-0">
            <CardTitle className="text-base sm:text-lg">Reservations History</CardTitle>
            <SearchBar />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:gap-8">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="flex items-center gap-2 sm:gap-4">
              <Avatar className="max-[350px]:hidden sm:h-9 sm:w-9">
                <AvatarImage src={reservation.patient.profilePic} alt="Avatar" />
                <AvatarFallback>{shortName(reservation.patient.name)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 sm:gap-1">
                <p className="text-xs sm:text-sm font-medium leading-none">{reservation.patient.name}</p>
                <p className="max-[400px]:hidden text-xs sm:text-sm text-muted-foreground">
                Phone: {reservation.patient.phoneNumbers.join(", ")}
                </p>
              </div>
              <div className="ltr:ml-auto rtl:mr-auto font-medium">
                <MedicalDetails size="sm"  reservation={reservation}/>
              </div>
            </div>
          ))}
        </CardContent>
        {/* <div className="flex justify-center items-center p-4 gap-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            size="icon"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {currentPage} / {reservations.length>0? totalPages:1}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages||reservations.length<=0}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div> */}
        <Pagination currentPage={currentPage} totalPages={totalPages}  handlePageChange={handlePageChange} />

      </Card>
  )
}