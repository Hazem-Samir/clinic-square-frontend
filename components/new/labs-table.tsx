"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoctorModal } from "@/components/new/doctor-modal"
import SearchBar from "../ui/SearchBar"
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Accept, Decline } from "@/lib/admin/clientApi"
import Pagination from "../Pagination"
import { DashboardCharts } from "./dashboard-charts"
import { DashboardHeader } from "./components_dashboard-header"



interface ILab {
  id:string
  name: string
  address: string[]
  phoneNumbers: string[]
  email: string
  profilePic: string
  state: boolean
  license: string[]
}
interface IProps{
  AcceptedLabs: ILab[]
  PendingLabs: ILab[]
  currentPage:number
  totalPages:number
}


export function LabsTable({AcceptedLabs,PendingLabs,currentPage,totalPages}:IProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLab, setSelectedLab] = useState<ILab|null>(null)
  const router = useRouter();

  // const filteredDoctors = Doctors.filter((doctor) =>
  //   lab.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  const handlePageChange=(newPage:number)=>{
    router.push(`labs?page=${newPage}`);
  }

  const handleAccept=async()=>{
    const res = await Accept({id:selectedLab.id})
    if (res.success === true) {
      toast.success(res.message, {
        duration: 2000,
        position: 'top-center',
      });
      router.refresh();
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }));
    }
    setSelectedLab(null);
  }
  

  const handleDecline=async()=>{
    const res = await Decline({id:selectedLab.id})
    if (res.success === true) {
      toast.success(res.message, {
        duration: 2000,
        position: 'top-center',
      });
      router.refresh();
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }));
    }
    setSelectedLab(null);
  }
  


  return (
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
            <TableContent
              labs={AcceptedLabs}
              setSelectedLab={setSelectedLab}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </TabsContent>
          <TabsContent value="pending">
            <TableContent
              labs={PendingLabs}
              setSelectedLab={setSelectedLab}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      {selectedLab && (
        <DoctorModal doctor={selectedLab} onClose={() => setSelectedLab(null)} onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </Card>
  )
}

function TableContent({ labs, setSelectedLab,currentPage,totalPages,handlePageChange }:{labs:ILab[], setSelectedLab: (lab:ILab)=>void,handlePageChange:(newPage:number)=>void ,currentPage:number,totalPages:number }) {

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Name</TableHead>
            <TableHead className="hidden sm:table-cell w-[40%]">Email</TableHead>
            <TableHead className="text-right w-[20%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {labs.map((lab) => (
            <TableRow key={lab.id}>
              <TableCell className="font-medium">Dr. {lab.name}</TableCell>
              <TableCell className="hidden sm:table-cell">{lab.email}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" onClick={() => setSelectedLab(lab)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Toaster />
      </Table>
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
    </div>
  )
}

