import { Suspense } from 'react'
import { format } from "date-fns"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import BlurFade from '@/components/ui/blur-fade'
import ReservationsTable from '@/components/doctor/ReservationsTable'
import Dashboard from '@/components/doctor/Dashboard'
import { getReservations } from '@/lib/doctor/api'
import Component from '@/components/Charts/component'
import { BarComponent } from '@/components/Charts/BarComponent'
import { RadChart } from '@/components/Charts/RadChart'
import { DashboardHeader } from '@/components/new/components_dashboard-header'
import { StatisticsCards } from '@/components/new/statistics-cards'
import { DashboardCharts } from '@/components/new/dashboard-charts'
import { getAllActorData, getAllActorStats, getAllPatientsData, getAllReservations, getAllReservationsStats } from '@/lib/api'
import { ActorsHeader } from '@/components/new/actors-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
async function PatientsStatData() {
  const [ {data:pendingActors},{data:allReservations},{data:stat}] = await Promise.all([
    getAllPatientsData(500000,1),
    getAllReservationsStats(50000,1,"doctor"),
     getAllActorStats(500000,1,"patient")
  ])
  

const Actors = monthNames.map((key, index) => {
  const found = stat.data.find(st => st._id.month === `${index + 1}` && st._id.state === true);
  return {
      key,
      actors: found ? found.count : 0
  };
});
const Reservations = monthNames.map((key, index) => {
  const found = allReservations.data.find(st => st._id.month === `${index + 1}`);
  return {
      key,
      reservations: found ? found.count : 0
  };
});
  return (

  <DashboardCharts chartsData={[Actors,Reservations,[{pendingActors:pendingActors.data.length}]]} titles={['Labs',"All Reservations"]} descriptions={['January - December 2024','January - December 2024',["The Pending Labs","Labs"]]} role='Lab'/>

  )
}


async function LabsStatData() {
  const [ {data:pendingActors},{data:allReservations},{data:stat}] = await Promise.all([
    getAllActorData(500000,1,"lab","false"),
    getAllReservationsStats(50000,1,"lab"),
     getAllActorStats(500000,1,"lab")
  ])
  

const Actors = monthNames.map((key, index) => {
  const found = stat.data.find(st => st._id.month === `${index + 1}` && st._id.state === true);
  return {
      key,
      actors: found ? found.count : 0
  };
});
const Reservations = monthNames.map((key, index) => {
  const found = allReservations.data.find(st => st._id.month === `${index + 1}`);
  return {
      key,
      reservations: found ? found.count : 0
  };
});
  return (

  <DashboardCharts chartsData={[Actors,Reservations,[{pendingActors:pendingActors.data.length}]]} titles={['Labs',"All Reservations"]} descriptions={['January - December 2024','January - December 2024',["The Pending Labs","Labs"]]} role='Lab'/>

  )
}

async function DoctorsStatData() {
  const [ {data:pendingActors},{data:allReservations},{data:stat}] = await Promise.all([
    getAllActorData(500000,1,"doctor","false"),
    getAllReservationsStats(50000,1,"doctor"),
     getAllActorStats(500000,1,"doctor")
  ])
  

const Actors = monthNames.map((key, index) => {
  const found = stat.data.find(st => st._id.month === `${index + 1}` && st._id.state === true);
  return {
      key,
      actors: found ? found.count : 0
  };
});
const Reservations = monthNames.map((key, index) => {
  const found = allReservations.data.find(st => st._id.month === `${index + 1}`);
  return {
      key,
      reservations: found ? found.count : 0
  };
});
  return (

  <DashboardCharts chartsData={[Actors,Reservations,[{pendingActors:pendingActors.data.length,}]]} titles={['Doctors',"All Reservations"]} descriptions={['January - December 2024','January - December 2024',["The Pending Doctors","Doctors"]]} role='Doctor'/>

  )
}


async function PharmaciesStatData() {
  const [ {data:pendingActors},{data:allReservations},{data:stat}] = await Promise.all([
    getAllActorData(500000,1,"pharmacy","false"),
    getAllReservationsStats(50000,1,"pharmacy"),
     getAllActorStats(500000,1,"pharmacy")
  ])
  

const Actors = monthNames.map((key, index) => {
  const found = stat.data.find(st => st._id.month === `${index + 1}` && st._id.state === true);
  return {
      key,
      actors: found ? found.count : 0
  };
});
const Reservations = monthNames.map((key, index) => {
  const found = allReservations.data.find(st => st._id.month === `${index + 1}`);
  return {
      key,
      reservations: found ? found.count : 0
  };
});
  return (

  <DashboardCharts chartsData={[Actors,Reservations,[{pendingActors:pendingActors.data.length,}]]} titles={['Pharmacies',"All Reservations"]} descriptions={['January - December 2024','January - December 2024',["The Pending Pharmacies","Pharmacies"]]} role='Pharmacie'/>

  )
}

async function ReservationsData({ page, date }: { page: number, date: string }) {
  const startOfDay = new Date(date)
  const endOfDay = new Date(startOfDay)
  endOfDay.setHours(23, 59, 59, 999)

  const { data: reservations } = await getReservations(5, page, startOfDay.toISOString(), endOfDay.toISOString(),"pending")

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
    <ProtectedRoute allowedRoles={['admin']}>  
     
     <main className="flex flex-1 flex-col gap-2 p-5 sm:gap-4 sm:p-4 md:gap-8 md:p-8 ">
      <BlurFade delay={0} className='space-y-6' inView>
 
        <Tabs defaultValue="Doctors" className="w-full">
        <div className="flex flex-col sm:flex-row justify-center items-center  mb-6 sm:mb-4 p-4 sm:p-0">

            <TabsList className="grid  grid-cols-1 md:grid-cols-2 md:mb-5 mb-24 md:space-y-0 space-y-2 md:bg-muted bg-transparent mr-0">
              <TabsTrigger value="Doctors">Doctors</TabsTrigger>
              {/* <TabsTrigger value="Patients">Patients</TabsTrigger> */}
              <TabsTrigger value="Labs">Labs</TabsTrigger>
              {/* <TabsTrigger value="Pharmacies">Pharmacies</TabsTrigger> */}
            </TabsList>
            </div>
            {/* <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:max-w-sm"
              /> */}
          <TabsContent value="Doctors" >
           <DoctorsStatData />
          </TabsContent>
          <TabsContent value="Patients">
           {/* <StatData /> */}
          </TabsContent>
          <TabsContent value="Labs">
           <LabsStatData />
          </TabsContent>
          <TabsContent value="Pharmacies">
          {/* <PharmaciesStatData /> */}
          </TabsContent>
        </Tabs>
 
        {/* <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <pharmaciesData page={page} />
        </Suspense>  */}
      </BlurFade>
      </main>
    </ProtectedRoute>
  )
}