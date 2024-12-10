import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import {getSchedule } from '@/lib/doctor/api'
import BlurFade from '@/components/ui/blur-fade'
import Schedule from '@/components/doctor/Schedule'
import DoctorsList from '@/components/patient/ourDoctors/DoctorsList'
import { getAllDoctors, getMyDoctorsResrvations, getMyLabsResrvations, getMyPharmaciesResrvations } from '@/lib/patient/api'
import MyActivity from '@/components/patient/MyActivity/MyActiviy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DoctorAppointments from '@/components/patient/MyActivity/DoctorsAppointments'
import LabAppointments from '@/components/patient/MyActivity/LabAppointments'
import PharmacyOrders from '@/components/patient/MyActivity/PharmacyOrders'

type activeTabOptions= "doctors"|"labs"|"pharmacies";

async function MyDoctorsResrvations({ page }: { page: number }) {
  const {data:doctors} = await getMyDoctorsResrvations(10,page);
  return (
   <DoctorAppointments
   currentPage={page}
   totalPages={doctors.paginationResult.numberOfPages}
   appointments={doctors.data}/>
  )
}


async function MyLabsResrvations({ page }: { page: number }) {
  const {data:labs} = await getMyLabsResrvations(10,page);
  return (
   <LabAppointments
   currentPage={page}
   totalPages={labs.paginationResult.numberOfPages}
   appointments={labs.data}/>
  )
}


async function MyPharmaciesResrvations({ page }: { page: number }) {
  const {data:pharmacies} = await getMyPharmaciesResrvations(10,page);
  return (
   <PharmacyOrders
   currentPage={page}
   totalPages={pharmacies.paginationResult.numberOfPages}
   orders={pharmacies.data}/>
  )
}

interface ISearchParams  { 
  doctorsPage?: string;
  labsPage?: string;
  pharmaciesPage?: string;
  activeTab?: activeTabOptions;
};


export default function MyActivityPage({ searchParams }: ISearchParams) {
  const doctorsPage = Number(searchParams.doctorsPage) || 1;
  const labsPage = Number(searchParams.labsPage) || 1;
  const pharmaciesPage = Number(searchParams.pharmaciesPage) || 1;
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
      <MyDoctorsResrvations page={doctorsPage} />
        </TabsContent>
        <TabsContent value="labs">
      <MyLabsResrvations page={labsPage} />
      
        </TabsContent>
        <TabsContent value="pharmacies">
      <MyPharmaciesResrvations page={pharmaciesPage} />
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