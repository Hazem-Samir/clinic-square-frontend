import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import { getReservationsHistory, getSchedule } from '@/lib/api'
import ReservationsHistoryTable from '@/components/doctor/ReservationsHisotryTable'
import BlurFade from '@/components/ui/blur-fade'
import Schedule from '@/components/doctor/Schedule'

async function ScheduleData() {
  const { data: {data:{schedule}} } = await getSchedule();
  console.log("aaaa",schedule)
  return (
    <Schedule 
      days={schedule.days}
      cost={schedule.cost}
  
    />
  )
}

export default function Page() {
  
  return (
    <ProtectedRoute allowedRoles={['doctor']}>
      <BlurFade delay={0} inView>


        <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
      <main className="flex flex-1 flex-col gap-2 p-5 sm:gap-4 sm:p-4 md:gap-8 md:p-8">
          <ScheduleData  />
      </main>
        </Suspense>
      </BlurFade>
    </ProtectedRoute>
  )
}