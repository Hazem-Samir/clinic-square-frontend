import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import { getReservationsHistory, getSchedule } from '@/lib/api'
import ReservationsHistoryTable from '@/components/doctor/ReservationsHisotryTable'
import BlurFade from '@/components/ui/blur-fade'
import Schedule from '@/components/doctor/Schedule'
import UserProfile from '@/components/doctor/Profile'
import { cookies } from 'next/headers'; // Import cookies function from Next.js

async function ProfileData() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user'); // Assuming the user info is stored in 'user' cookie
  const  user = JSON.parse(userCookie.value); 
  console.log(user)
  return (
    <UserProfile 
      profile={user}
  
    />
  )
}

export default function Page() {
  
  return (
    <ProtectedRoute allowedRoles={['doctor']}>
      <BlurFade delay={0} inView>


        <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
      <main className="flex flex-1 flex-col gap-2 p-5 sm:gap-4 sm:p-4 md:gap-8 md:p-8">
          <ProfileData  />
      </main>
        </Suspense>
      </BlurFade>
    </ProtectedRoute>
  )
}