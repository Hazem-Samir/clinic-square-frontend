import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import { getQuestions } from '@/lib/doctor/api'
import BlurFade from '@/components/ui/blur-fade'
import QuestionsList from '@/components/doctor/QuestionsList'
import { ActorsHeader } from '@/components/new/actors-header'
import { getAllActorData, getAllDoctors, getAllpharmacies, getAllReservations } from '@/lib/api'
import { StatisticsCards } from '@/components/new/statistics-cards'
import { pharmaciesTable } from '@/components/new/pharmacies-table'
import { ActorsTable } from '@/components/new/actors-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchBar from '@/components/ui/SearchBar'

async function PharmaciesStats() {
  
  const [ {data:AcceptedPharmacies},{data:PendingPharmacies},{data:allReservations}] = await Promise.all([
    getAllActorData(500000,1,"pharmacy","true"),
    getAllActorData(500000,1,"pharmacy","false"),
    getAllReservations(50000,1,"pharmacy")
  ])
  return (
    
    <StatisticsCards stats={[
      {title:"Total Pharmacies",icon:"Users",value:(AcceptedPharmacies.data.length+PendingPharmacies.data.length),paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Approved Pharmacies",icon:"UserCheck",value:AcceptedPharmacies.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Pending Pharmacies",icon:"UserPlus",value:PendingPharmacies.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Total Reservations",icon:"UserPlus",value:allReservations.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
  
  
  
  
  ]} />


  )
}

async function PendingPharmaciesData({ page }: { page: number }) {
  
  const {data:pharmacies}=await getAllActorData(5,page,"pharmacy","false")

  console.log("asds",pharmacies.data)
  return (
    

   <ActorsTable
   currentPage={page}
   totalPages={pharmacies.paginationResult.numberOfPages}
   Actors={pharmacies.data}
   role='Pharmacy'
   />
  )
}

async function AcceptedPharmaciesData({ page }: { page: number }) {
  
  const {data:pharmacies}=await getAllActorData(5,page,"pharmacy","true")

  console.log("asds",pharmacies.data)
  return (
    

   <ActorsTable
   currentPage={page}
   totalPages={pharmacies.paginationResult.numberOfPages}
   Actors={pharmacies.data}
   role='Pharmacy'
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
      <ActorsHeader role='Pharmacie'/>
      <PharmaciesStats />
      <Card>
      <CardHeader>
        <CardTitle>Pharmacies</CardTitle>
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
           <AcceptedPharmaciesData page={Apage}/>
          </TabsContent>
          <TabsContent value="pending">
            <PendingPharmaciesData page={Ppage} />
          </TabsContent>
        </Tabs>
      </CardContent>
     
    </Card>
        {/* <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <pharmaciesData page={page} />
        </Suspense>  */}
      </BlurFade>
      </main>
    </ProtectedRoute>
  )
}