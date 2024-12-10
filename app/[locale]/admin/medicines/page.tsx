import { Suspense } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute"
import { Skeleton } from "@/components/ui/skeleton"
import { getQuestions } from '@/lib/doctor/api'
import BlurFade from '@/components/ui/blur-fade'
import QuestionsList from '@/components/doctor/QuestionsList'
import { ActorsHeader } from '@/components/new/actors-header'
import { getAllActorData, getAllDoctors, getAllmedicines, getAllProductData, getAllReservations } from '@/lib/api'
import { StatisticsCards } from '@/components/new/statistics-cards'
import { medicinesTable } from '@/components/new/medicines-table'
import { ActorsTable } from '@/components/new/actors-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchBar from '@/components/ui/SearchBar'
import { ProductsTable } from '@/components/new/products-table'
import { DashboardHeader } from '@/components/new/components_dashboard-header'
import { ProductsHeader } from '@/components/new/products-header'

async function MedicinesStats() {
  
  const [ {data:AcceptedMedicines},{data:PendingMedicines},{data:allReservations}] = await Promise.all([
    getAllProductData(500000,1,"medicines","true"),
    getAllProductData(500000,1,"medicines","false"),
    getAllReservations(50000,1,"lab")
  ])
  return (
    
    <StatisticsCards stats={[
      {title:"Total Medicines",icon:"Users",value:(AcceptedMedicines.data.length+PendingMedicines.data.length),paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Approved Medicines",icon:"UserCheck",value:AcceptedMedicines.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      {title:"Pending Medicines",icon:"UserPlus",value:PendingMedicines.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
      // {title:"Total Reservations",icon:"UserPlus",value:allReservations.data.length,paragragph:(<p className="text-xs text-muted-foreground">On The App</p>)},
  
  
  
  
  ]} />


  )
}

async function PendingMedicinesData({ page }: { page: number }) {
  
  const {data:medicines}=await getAllProductData(5,page,"medicines","false")

  console.log("asds",medicines.data)
  return (
    
    <ProductsTable
    currentPage={page}
    totalPages={medicines.paginationResult.numberOfPages}
    Products={medicines.data}
    type='Medicine'
    />
  )
}

async function AcceptedMedicinesData({ page }: { page: number }) {
  
  const {data:medicines}=await getAllProductData(5,page,"medicines","true")


  console.log("asds",medicines.data)
  return (
    

   <ProductsTable
   currentPage={page}
   totalPages={medicines.paginationResult.numberOfPages}
   Products={medicines.data}
   type='Medicine'
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
      <ProductsHeader type='Medicne'/>
      <MedicinesStats />
      <Card>
      <CardHeader>
        <CardTitle>Medicines</CardTitle>
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
           <AcceptedMedicinesData page={Apage}/>
          </TabsContent>
          <TabsContent value="pending">
            <PendingMedicinesData page={Ppage} />
          </TabsContent>
        </Tabs>
      </CardContent>
     
    </Card>
        {/* <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
          <medicinesData page={page} />
        </Suspense>  */}
      </BlurFade>
      </main>
    </ProtectedRoute>
  )
}