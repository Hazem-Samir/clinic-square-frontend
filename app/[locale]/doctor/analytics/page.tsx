import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import {  getReservationsStat } from '@/lib/doctor/api'
import BlurFade from '@/components/ui/blur-fade'
import { DashboardCharts } from '@/components/ui/dashboard-charts'
import { cookies } from 'next/headers'; // Import cookies function from Next.js

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


async function StatData() {
  const {data:stats}=await getReservationsStat(50000000,1);

  

const cookieStore = cookies();
const userCookie = cookieStore.get('user'); 
const thisYear=new Date().getFullYear()

const  user =userCookie? JSON.parse(userCookie.value):null; 
const Revenues = monthNames.map((key, index) => {
  const found = stats.data.find(st => Number(st._id.month) === index + 1&&st._id.year==thisYear);
  return {
      key,
      revenue: found ? found.count*user.schedule.cost : 0
  };
});

const TotalRevnue=stats.data.reduce((sum,obj)=>obj._id.year==thisYear? sum+ obj.count:null,0);


const Reservations = monthNames.map((key, index) => {
  const found = stats.data.find(st => Number(st._id.month) === index + 1&&st._id.year==thisYear);
  return {
      key,
      reservations: found ? found.count : 0
  };
});
  return (

  <DashboardCharts chartsData={[Reservations,Revenues,[{pendingActors:TotalRevnue*user.schedule.cost,}]]} titles={['Reservations',"REM"]} descriptions={[`Jan-Dec`,`Jan-Dec`,["Total_Revenue",`in`]]} role='Doctor'/>

  )
}

export default function DoctorStats() {

  return (
    <ProtectedRoute allowedRoles={['lab']}>

      <main className="flex flex-1 flex-col gap-2 p-2 sm:gap-4 sm:p-4 md:gap-8 md:p-8">
      <BlurFade delay={0} inView>
        <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <StatData />

        </Suspense>
      </BlurFade>
      </main>
    </ProtectedRoute>
  )
}