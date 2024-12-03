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
import ShowReservation from "./ShowOrders"
import Pagination from "../Pagination"
import ShowOrders from "./ShowOrders"





interface IProps {
  orders: EndReservationValues[];
  currentPage: number;
  totalPages: number;
}

export default function OrdersTable({orders, currentPage, totalPages}: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [SearchedReservation, setSearchedReservaion] = useState(orders);
  const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

  useEffect(() => {
    setSearchedReservaion(orders);
  }, [orders]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = orders.filter(reservation => 
      order.patient.name.toLowerCase().includes(lowercasedQuery)
    );
    setSearchedReservaion(filtered);
  };

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    router.push(`lab?page=${newPage}`);
    setIsLoading(false);
  };

  const handleDateChange = (date: Date) => {
    const newDate = format(date, "yyyy-MM-dd");
    setIsLoading(true);
    router.push(`doctor?page=${currentPage}&date=${newDate}`);
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
          <CardTitle className="text-base sm:text-lg">New Orders</CardTitle>
          <div className="flex items-center gap-2">
            <SearchBar onSearch={handleSearch} setSearchedReservaion={setSearchedReservaion} />
    
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:gap-8">
        {isLoading ? (
          <div className="text-center">Loading orders...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : SearchedReservation.length === 0 ? (
          <div className="text-center">No orders found.</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="flex items-center gap-2 sm:gap-4">
              <Avatar className="max-[350px]:hidden sm:h-9 sm:w-9">
                <AvatarImage src={order.patient.profilePic} alt="Avatar" />
                <AvatarFallback>{shortName(order.patient.name)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 sm:gap-1">
                <p className="text-xs sm:text-sm font-medium leading-none">{order.patient.name}</p>
                <p className="max-[400px]:hidden text-xs sm:text-sm text-muted-foreground">
                  Phone: {order.patient.phoneNumbers.join(", ")}
                </p>
              </div>
              <div className="ltr:ml-auto rtl:mr-auto font-medium">
                <ShowOrders size="sm"  currentPage={currentPage}  order={order}/>
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
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} currentDate={currentDate} isLoading={isLoading}  handlePageChange={handlePageChange} /> */}

    </Card>
  )
}