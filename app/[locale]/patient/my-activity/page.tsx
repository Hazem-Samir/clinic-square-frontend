import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import {getSchedule } from '@/lib/doctor/api'
import BlurFade from '@/components/ui/blur-fade'
import Schedule from '@/components/doctor/Schedule'
import DoctorsList from '@/components/patient/ourDoctors/DoctorsList'
import { getAllDoctors, getMyDoctorsResrvations } from '@/lib/patient/api'
import MyActivity from '@/components/patient/MyActivity/MyActiviy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DoctorAppointments from '@/components/patient/MyActivity/DoctorsAppointments'

type activeTabOptions= "doctors"|"labs"|"pharmacies";

async function MyDoctorsResrvations({ page }: { page: number }) {
  const {data:doctors} = await getMyDoctorsResrvations(10,page);
  console.log(doctors.data)
  return (
   <DoctorAppointments
   currentPage={page}
   totalPages={doctors.paginationResult.numberOfPages}
   appointments={doctors.data}/>
  )
}
export default function MyActivityPage({ searchParams }: { searchParams: { page?: string ,activeTab?:activeTabOptions} }) {
  const page = Number(searchParams.page) || 1
  const activeTab = searchParams.activeTab || "doctors";

  return (
    <ProtectedRoute allowedRoles={['patient']}>


      <BlurFade delay={0} className="flex-grow p-4 md:p-8 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full bg-background  text-foreground" inView>
      <main    className="flex-grow p-4 md:p-8 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full bg-background  text-foreground" >
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Medical Dashboard</h1>
      <Tabs defaultValue={activeTab}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 md:mb-5 mb-24 md:space-y-0 space-y-2 md:bg-muted bg-transparent ">
          <TabsTrigger value="doctors">Doctor Appointments</TabsTrigger>
          <TabsTrigger value="labs">Lab Appointments</TabsTrigger>
          <TabsTrigger value="pharmacies">Pharmacy Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="doctors">
      <MyDoctorsResrvations page={page} />
          {/* <DoctorAppointments /> */}
        </TabsContent>
        <TabsContent value="labs">
          {/* <LabAppointments /> */}
        </TabsContent>
        <TabsContent value="pharmacies">
          {/* <PharmacyOrders /> */}
        </TabsContent>
      </Tabs>
    </div>
    </main>
        {/* <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <DoctorsData  page={page} activeTab={activeTab}/>
        </Suspense> */}
      </BlurFade>
    </ProtectedRoute>
  )
}