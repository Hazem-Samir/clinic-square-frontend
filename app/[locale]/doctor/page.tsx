import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import { getReservations, getReservationsHistory } from '@/lib/api'
import ReservationsHistoryTable from '@/components/doctor/ReservationsHisotryTable'
import BlurFade from '@/components/ui/blur-fade'
import Revenue from '@/components/Charts/Revenue'
import Patients from '@/components/Charts/Patients'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  Activity,
} from "lucide-react"
import { format, addDays } from "date-fns"
import ReservationsTable from '@/components/doctor/ReservationsTable'
async function ReservationsData({ page,date }: { page: number,date:string }) {
  const { data: reservations } = await getReservations(5,page,date);
  return (
    <ReservationsTable 
      reservations={reservations.data}
      currentPage={page}
      totalPages={reservations.paginationResult.numberOfPages}
      currentDate={date}
    />
  )
}

export default function page({ searchParams }: { searchParams: { page?: string , date?:string } }) {
  const page = Number(searchParams.page) || 1;
  // const date =  searchParams.date?.toISOString() || new Date().toISOString()
  const date = searchParams.date? format(searchParams.date, 'yyyy-MM-dd') : format(new Date().toDateString(),'yyy-MM-dd')

  return (
    <ProtectedRoute allowedRoles={['doctor']}>  
       <BlurFade delay={0}  inView>
      <main className="flex flex-1 flex-col gap-2 p-2 sm:gap-4 sm:p-4 md:gap-8 md:p-8">
        <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Revenue />
          <Patients />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <ReservationsData page={page} date={date} />
        </Suspense>
      </main>
      </BlurFade>
  
    </ProtectedRoute>
  )
}