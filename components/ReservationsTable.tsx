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
import { CalendarDays } from "lucide-react"
import ShowReservation from "@/components/ShowReservation"
import SearchBar from "@/components/ui/SearchBar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, addDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getToken } from "@/lib/auth"
import { shortName } from "@/lib/utils"
import { PatientValue } from "@/schema/Patient"
import { EndReservationValues } from "@/schema/DoctorReservation"

interface IReservations
{
createdAt: string;

date:string;

doctor:string;
id:string;
updatedAt:string;
patient:PatientValue;
report:EndReservationValues;
}

const getReservations = async (limit:number,page: number, date: string) => {
  const token = getToken();
  console.log("token", token);
  console.log(date)
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    date: date,
  }).toString();
  const response = await fetch(`/api/doctor/reservations?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reservations');
  }

  const res = await response.json();
  console.log(res);
  return res;
}

export default function ReservationsTable() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfPages, SetNumberOfPages] = useState(0)
  const [reservations, setReservations] = useState<IReservations[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const {data} = await getReservations(5,currentPage,  format(selectedDate, 'yyyy-MM-dd'));
      console.log("data",data.data)
      setReservations(data.data);
      setCurrentPage(data.paginationResult.currentPage)
      SetNumberOfPages(data.paginationResult.numberOfPages)
      setError(null);
    } catch (err) {
      setError('Failed to fetch reservations. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    

    fetchReservations();
  }, [currentPage, selectedDate]);


  const handleReservationUpdate = () => {
    fetchReservations();
  }


  const getDayOptions = () => {
    const options = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i)
      options.push({
        value: date.toISOString(),
        label: format(date, 'MMM d'),
        fullLabel: i === 0 ? `Today (${format(date, 'MMM d')})` : format(date, 'MMM d')
      })
    }
    return options
  }

  const dayOptions = getDayOptions()

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-4">
          <CardTitle className="text-base sm:text-lg">Reservations</CardTitle>
          <div className="flex items-center gap-2 ">
            <SearchBar />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="flex flex-col">
                  {dayOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => setSelectedDate(new Date(option.value))}
                    >
                      {option.fullLabel}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <div className="text-sm font-medium">
              {format(selectedDate, 'MMM d')}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:gap-8">
        {isLoading ? (
          <div className="text-center">Loading reservations...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : reservations.length === 0 ? (
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
                <ShowReservation size="sm" patient={reservation.patient}  onReservationUpdate={handleReservationUpdate} RID={reservation.id}/>
              </div>
            </div>
          ))
        )}
      </CardContent>
      {!isLoading && !error && reservations.length > 0 && (
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
            {currentPage} / {numberOfPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numberOfPages))}
            disabled={currentPage === numberOfPages}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}