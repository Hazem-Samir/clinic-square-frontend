import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import { getQuestions } from '@/lib/doctor/api'
import BlurFade from '@/components/ui/blur-fade'
import QuestionsList from '@/components/doctor/QuestionsList'
import { ActorsHeader } from '@/components/new/actors-header'
import { getAllActorData, getAllDoctors, getAlldoctors, getAllReservations } from '@/lib/api'
import { StatisticsCards } from '@/components/new/statistics-cards'
import { ActorsTable } from '@/components/new/actors-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchBar from '@/components/ui/SearchBar'
async function doctorsData({ page }: { page: number }) {
  
  const [{data:doctors}, {data:alldoctors},{data:allReservations}] = await Promise.all([
    getAllActorData(5,page,"lab"),
    getAllActorData(500000,1,"lab"),
    getAllReservations(50000,1,"lab")
  ])
  console.log(doctors.data)
  return (
    <>
    <StatisticsCards stats={[
      {title:"Total doctors",icon:"Users",value:alldoctors.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Approved doctors",icon:"UserCheck",value:alldoctors.data.filter((d) => d.state === true).length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Pending doctors",icon:"UserPlus",value:alldoctors.data.filter((d) => d.state === false).length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Total Reservations",icon:"UserPlus",value:allReservations.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
  
  
  
  
  ]} />

   <ActorsTable
   currentPage={page}
   totalPages={doctors.paginationResult.numberOfPages}
   Actors={doctors.data.filter((d) => d.state === true)}
   PendingActors={doctors.data.filter((d) => d.state === false)}
   role='Lab'
   />
   </>
  )
}
async function DoctorsStats() {
  
  const [ {data:AcceptedDoctors},{data:PendingDoctors},{data:allReservations}] = await Promise.all([
    getAllActorData(500000,1,"doctor","true"),
    getAllActorData(500000,1,"doctor","false"),
    getAllReservations(50000,1,"doctor")
  ])
  return (
    
    <StatisticsCards stats={[
      {title:"Total Doctors",icon:"Users",value:(AcceptedDoctors.data.length+PendingDoctors.data.length),paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Approved Doctors",icon:"UserCheck",value:AcceptedDoctors.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Pending Doctors",icon:"UserPlus",value:PendingDoctors.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Total Reservations",icon:"UserPlus",value:allReservations.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
  
  
  
  
  ]} />


  )
}

async function PendingDoctorsData({ page }: { page: number }) {
  
  const {data:doctors}=await getAllActorData(5,page,"doctor","false")

  console.log("asds",doctors.data)
  return (
    

   <ActorsTable
   currentPage={page}
   totalPages={doctors.paginationResult.numberOfPages}
   Actors={doctors.data}
   role='Doctor'
   />
  )
}

async function AcceptedDoctorsData({ page }: { page: number }) {
  
  const {data:doctors}=await getAllActorData(5,page,"doctor","true")

  console.log("asds",doctors.data)
  return (
    

   <ActorsTable
   currentPage={page}
   totalPages={doctors.paginationResult.numberOfPages}
   Actors={doctors.data}
   role='Doctor'
   />
  )
}

export default function Page({ searchParams }: { searchParams: { Apage?: string,Ppage?: string  } }) {
  const Apage = Number(searchParams.Apage) || 1;
  const Ppage = Number(searchParams.Ppage) || 1;

  
  return (
    <ProtectedRoute allowedRoles={['admin']}>


      <main className="flex flex-1 flex-col gap-2 p-5 sm:gap-4 sm:p-4 md:gap-8 md:p-8 ">
      <BlurFade delay={0} className='space-y-6' inView>
      <ActorsHeader role='Doctor'/>
      <DoctorsStats  />
      <Card>
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <Tabs defaultValue="approved" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center  mb-4 p-4 sm:p-0">
            <TabsList className="mb-4 sm:mb-0">
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            {/* <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:max-w-sm"
            /> */}
            <SearchBar />
          </div>
          <TabsContent value="approved">
           <AcceptedDoctorsData page={Apage}/>
          </TabsContent>
          <TabsContent value="pending">
            <PendingDoctorsData page={Ppage} />
          </TabsContent>
        </Tabs>
      </CardContent>
     
    </Card>
        {/* <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <doctorsData page={page} />
        </Suspense>  */}
      </BlurFade>
      </main>
    </ProtectedRoute>
  )
}