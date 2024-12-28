import { Suspense } from 'react'
import { format } from "date-fns"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import BlurFade from '@/components/ui/blur-fade'
import ReservationsTable from '@/components/lab/ReservationsTable'
import Dashboard from '@/components/lab/Dashboard'
import { getReservations } from '@/lib/lab/api'

async function DashboardData() {
  const today = new Date()
  const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
  const lastDayOfPreviousMonth = new Date(firstDayOfMonth.getTime() - 1)
  const startOfDay = new Date(today.setHours(0, 0, 0, 0))
  const endOfDay = new Date(today.setHours(23, 59, 59, 999))

  const [monthResults, todayResults, prevMonthResults] = await Promise.all([
    getReservations(10000000, 1, firstDayOfMonth.toISOString(), lastDayOfMonth.toISOString(),"completed"),
    getReservations(10000000, 1, startOfDay.toISOString(), endOfDay.toISOString(),"new"),
    getReservations(10000000, 1, firstDayOfPreviousMonth.toISOString(), lastDayOfPreviousMonth.toISOString(),"completed")
  ])
 let ThismonthRevenue=0;
  monthResults.data.data.map((data:{requestedTests:{testDetails:{cost:number}}[]})=>{
    data.requestedTests.map((test)=>{
     ThismonthRevenue+=Number(test.testDetails.cost)
    })
  })

  let prevmonthRevenue=0;
  prevMonthResults.data.data.map((data:{requestedTests:{testDetails:{cost:number}}[]})=>{
    data.requestedTests.map((test)=>{
      prevmonthRevenue+=Number(test.testDetails.cost)
    })
  })
  

  return (
    <Dashboard 
      monthResults={ThismonthRevenue}
      todayResults={todayResults.data.results}
      prevMonthResults={prevmonthRevenue}
    />
  )
}

async function ReservationsData({ page, date }: { page: number, date: string }) {
  const startOfDay = new Date(date)
  const endOfDay = new Date(startOfDay)
  endOfDay.setHours(23, 59, 59, 999)

  const { data: reservations } = await getReservations(7, page, startOfDay.toISOString(), endOfDay.toISOString(),"new")

  return (
    <ReservationsTable 
      reservations={reservations.data}
      currentPage={page}
      totalPages={reservations.paginationResult.numberOfPages}
      currentDate={date}
    />
  )
}

export default function HomePage({ searchParams }: { searchParams: { page?: string, date?: string } }) {
  const page = Number(searchParams.page) || 1
  const date = searchParams.date 
    ? format(new Date(searchParams.date), 'yyyy-MM-dd') 
    : format(new Date(), 'yyyy-MM-dd')

  return (
    <ProtectedRoute allowedRoles={['lab']}>  
      <BlurFade delay={0} inView>
        <div className="flex flex-1 flex-col gap-2 p-2 sm:gap-4 sm:p-4 md:gap-8 md:p-8">
          <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
            <DashboardData />
          </Suspense>
          <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
            <ReservationsData page={page} date={date} />
          </Suspense>
        </div>
      </BlurFade>
    </ProtectedRoute>
  )
}