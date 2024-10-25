'use client'

import { useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ShowReservation from "@/components/ShowReservation"
import SearchBar from "@/components/ui/SearchBar"
import MedicalDetails from "./MedicalDetails"
import BlurFade from "./ui/blur-fade"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for demonstration
const mockReservations = Array(20).fill(null).map((_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@email.com`,
  avatar: `/avatars/0${(index % 5) + 1}.png`,
}))

export default function ReservationsHistoryTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(mockReservations.length / itemsPerPage)

  const paginatedReservations = mockReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <BlurFade delay={0} inView>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-0">
            <CardTitle className="text-base sm:text-lg">Reservations History</CardTitle>
            <SearchBar />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:gap-8">
          {paginatedReservations.map((reservation) => (
            <div key={reservation.id} className="flex items-center gap-2 sm:gap-4">
              <Avatar className="max-[350px]:hidden sm:h-9 sm:w-9">
                <AvatarImage src={reservation.avatar} alt="Avatar" />
                <AvatarFallback>{reservation.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 sm:gap-1">
                <p className="text-xs sm:text-sm font-medium leading-none">{reservation.name}</p>
                <p className="max-[400px]:hidden text-xs sm:text-sm text-muted-foreground">
                  {reservation.email}
                </p>
              </div>
              <div className="ltr:ml-auto rtl:mr-auto font-medium">
                <MedicalDetails size="sm" />
              </div>
            </div>
          ))}
        </CardContent>
        <div className="flex justify-center items-center p-4 gap-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            size="icon"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </BlurFade>
  )
}