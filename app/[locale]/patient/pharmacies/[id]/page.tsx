import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import BlurFade from '@/components/ui/blur-fade'
import PharmacyDetails from '@/components/patient/Pharmacies/PharnacyDetails'
import { getOnePharmacy, GetPharmacyMedicine } from '@/lib/patient/api'


export default async function PharmacyDetailsPage({ params }: { params: { locale:string,id: string } }) {
  const {data:{data:pharmacy}}=await getOnePharmacy(params.id);
  const PharmacyMedicine=await GetPharmacyMedicine(params.id);

  return (
    <ProtectedRoute allowedRoles={['patient']}>


      <BlurFade delay={0} className="flex-grow p-4 md:p-8 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full bg-background  text-foreground" inView>
        <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <PharmacyDetails   Pharmacy={pharmacy} Medicines={PharmacyMedicine.data.data} currentPage={PharmacyMedicine.data.paginationResult.current} totalPages={PharmacyMedicine.data.paginationResult.numberOfPages} />
        </Suspense>
      </BlurFade>
    </ProtectedRoute>
  )
}