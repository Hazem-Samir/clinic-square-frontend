import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import BlurFade from '@/components/ui/blur-fade'
import {  GetLabTests, getOneLab } from '@/lib/patient/api'
import LabDetails from '@/components/patient/Labs/LabDetails'


export default async function DoctorDetailsPage({ params }: { params: { locale:string,id: string } }) {
  const {data:{data:lab}}=await getOneLab(params.id);
  const LabTests=await GetLabTests(params.id);

  return (
    <ProtectedRoute allowedRoles={['patient']}>


      <BlurFade delay={0} className="flex-grow p-4 md:p-8 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full bg-background  text-foreground" inView>
        <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <LabDetails  Lab={lab} Tests={LabTests.data.data} currentPage={LabTests.data.paginationResult.current} totalPages={LabTests.data.paginationResult.numberOfPages} />
          
        </Suspense>
      </BlurFade>
    </ProtectedRoute>
  )
}