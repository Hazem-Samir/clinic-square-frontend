'use client'

import { useState, useEffect } from "react"
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
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import SearchBar from "@/components/ui/SearchBar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, addDays } from "date-fns"
import { shortName } from "@/lib/utils"
import { EndReservationValues } from "@/schema/DoctorReservation"
import { useRouter } from 'next/navigation'
import ShowReservation from "./ShowReservation"
import Pagination from "../Pagination"

interface IProps {
  reservations: EndReservationValues[];
  currentPage: number;
  totalPages: number;
  currentDate?: string;
}

export default function ReservationsTable({reservations, currentPage, totalPages, currentDate}: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [SearchedReservation, setSearchedReservaion] = useState(reservations);
  const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

  useEffect(() => {
    setSearchedReservaion(reservations);
  }, [reservations]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = reservations.filter(reservation => 
      reservation.patient.name.toLowerCase().includes(lowercasedQuery)
    );
    setSearchedReservaion(filtered);
  };

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    router.push(`lab?page=${newPage}&date=${currentDate}`);
    setIsLoading(false);
  };

  const handleDateChange = (date: Date) => {
    const newDate = format(date, "yyyy-MM-dd");
    setIsLoading(true);
    router.push(`lab?page=${currentPage}&date=${newDate}`);
    setIsLoading(false);
  };
  
  const getDayOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      options.push({
        value: date.toISOString(),
        label: format(date, 'MMM d'),
        fullLabel: i === 0 ? `Today (${format(date, 'MMM d')})` : format(date, 'MMM d')
      });
    }
    return options;
  };

  const dayOptions = getDayOptions();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-4">
          <CardTitle className="text-base sm:text-lg">Reservations</CardTitle>
          <div className="flex items-center gap-2">
            <SearchBar onSearch={handleSearch} setSearchedReservaion={setSearchedReservaion} />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent disabled={isLoading} className="w-auto p-0" align="end">
                <div className="flex flex-col">
                  {dayOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => handleDateChange(new Date(option.value))}
                    >
                      {option.fullLabel}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <div className="text-sm font-medium">
              {currentDate ? format(new Date(currentDate), 'MMM d') : 'No date selected'}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:gap-8">
        {isLoading ? (
          <div className="text-center">Loading reservations...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : SearchedReservation.length === 0 ? (
          <div className="text-center">No reservations found.</div>
        ) : (
          reservations.map((reservation) => (
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
                <ShowReservation size="sm" patient={reservation.patient} currentPage={currentPage} currentDate={currentDate} RID={reservation.id} requestedTests={reservation.requestedTests}/>
              </div>
            </div>
          ))
        )}
      </CardContent>
      
      {/* <div className="flex justify-center items-center p-4 gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          size="icon"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          size="icon"
          variant="outline"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div> */}
      <Pagination currentPage={currentPage} totalPages={totalPages} currentDate={currentDate} isLoading={isLoading}  handlePageChange={handlePageChange} />

    </Card>
  )
}