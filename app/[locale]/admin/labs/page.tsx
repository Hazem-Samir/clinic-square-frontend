import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import { getQuestions } from '@/lib/doctor/api'
import BlurFade from '@/components/ui/blur-fade'
import QuestionsList from '@/components/doctor/QuestionsList'
import { ActorsHeader } from '@/components/new/actors-header'
import { getAllActorData, getAllDoctors, getAllLabs, getAllReservations } from '@/lib/api'
import { StatisticsCards } from '@/components/new/statistics-cards'
import { LabsTable } from '@/components/new/labs-table'
import { ActorsTable } from '@/components/new/actors-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchBar from '@/components/ui/SearchBar'
async function LabsData({ page }: { page: number }) {
  
  const [{data:labs}, {data:allLabs},{data:allReservations}] = await Promise.all([
    getAllActorData(5,page,"lab"),
    getAllActorData(500000,1,"lab"),
    getAllReservations(50000,1,"lab")
  ])
  console.log(labs.data)
  return (
    <>
    <StatisticsCards stats={[
      {title:"Total Labs",icon:"Users",value:allLabs.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Approved Labs",icon:"UserCheck",value:allLabs.data.filter((d) => d.state === true).length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Pending Labs",icon:"UserPlus",value:allLabs.data.filter((d) => d.state === false).length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Total Reservations",icon:"UserPlus",value:allReservations.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
  
  
  
  
  ]} />

   <ActorsTable
   currentPage={page}
   totalPages={labs.paginationResult.numberOfPages}
   Actors={labs.data.filter((d) => d.state === true)}
   PendingActors={labs.data.filter((d) => d.state === false)}
   role='Lab'
   />
   </>
  )
}
async function LabsStats() {
  
  const [ {data:AcceptedLabs},{data:PendingLabs},{data:allReservations}] = await Promise.all([
    getAllActorData(500000,1,"lab","true"),
    getAllActorData(500000,1,"lab","false"),
    getAllReservations(50000,1,"lab")
  ])
  return (
    
    <StatisticsCards stats={[
      {title:"Total Labs",icon:"Users",value:(AcceptedLabs.data.length+PendingLabs.data.length),paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Approved Labs",icon:"UserCheck",value:AcceptedLabs.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Pending Labs",icon:"UserPlus",value:PendingLabs.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Total Reservations",icon:"UserPlus",value:allReservations.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
  
  
  
  
  ]} />


  )
}

async function PendingLabsData({ page }: { page: number }) {
  
  const {data:labs}=await getAllActorData(5,page,"lab","false")

  console.log("asds",labs.data)
  return (
    

   <ActorsTable
   currentPage={page}
   totalPages={labs.paginationResult.numberOfPages}
   Actors={labs.data}
   role='Lab'
   />
  )
}

async function AcceptedLabsData({ page }: { page: number }) {
  
  const {data:labs}=await getAllActorData(5,page,"lab","true")

  console.log("asds",labs.data)
  return (
    

   <ActorsTable
   currentPage={page}
   totalPages={labs.paginationResult.numberOfPages}
   Actors={labs.data}
   role='Lab'
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
      <ActorsHeader role='Lab'/>
      <LabsStats />
      <Card>
      <CardHeader>
        <CardTitle>Labs</CardTitle>
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
           <AcceptedLabsData page={Apage}/>
          </TabsContent>
          <TabsContent value="pending">
            <PendingLabsData page={Ppage} />
          </TabsContent>
        </Tabs>
      </CardContent>
     
    </Card>
        {/* <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <LabsData page={page} />
        </Suspense>  */}
      </BlurFade>
      </main>
    </ProtectedRoute>
  )
}