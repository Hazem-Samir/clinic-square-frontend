import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import {getSchedule } from '@/lib/doctor/api'
import BlurFade from '@/components/ui/blur-fade'
import Schedule from '@/components/doctor/Schedule'
import DoctorsList from '@/components/patient/ourDoctors/DoctorsList'
import { getAllDoctors } from '@/lib/patient/api'

async function DoctorsData({ page }: { page: number }) {
  const {data:doctors} = await getAllDoctors(10,page);
  console.log(doctors)
  return (
   <DoctorsList
   currentPage={page}
   totalPages={doctors.paginationResult.numberOfPages}
   Doctors={doctors.data}/>
  )
}

export default function OurDoctors({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page) || 1

  return (
    <ProtectedRoute allowedRoles={['patient']}>


      <BlurFade delay={0} className="flex-grow p-4 md:p-8 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full bg-background  text-foreground" inView>
        <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <DoctorsData  page={page} />
        </Suspense>
      </BlurFade>
    </ProtectedRoute>
  )
}