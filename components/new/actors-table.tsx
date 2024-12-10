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
import { Accept, AcceptActor, Decline, DeclineActor } from "@/lib/admin/clientApi"
import Pagination from "../Pagination"
import { DashboardCharts } from "./dashboard-charts"
import { DashboardHeader } from "./components_dashboard-header"



interface IDoctor {
  id:string
  name: string
  dateOfBirth: string
  email: string
  address: string[]
  phoneNumbers: string[]
  specialization: string
  profilePic: string
  state?: boolean 
  about: string
  license: string[]
  gender: string
}
type role= "Patient" | "Pharmacy" | "Lab" | "Doctor" 
interface IProps{
  Actors: IDoctor[]
  currentPage:number
  totalPages:number
  role: role
}


export function ActorsTable({currentPage,totalPages,Actors,role}:IProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedActor, setSelecetdActor] = useState<IDoctor|null>(null)
  const router = useRouter();

  // const filteredDoctors = Doctors.filter((doctor) =>
  //   actor.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )
  const handlePageChange=(newPage:number)=>{
    if(Actors.length>0){
      if(Actors[0].state===undefined){

        router.push(`${role.toLowerCase()}s?page=${newPage}`);
      }
      else if(Actors[0].state){

        router.push(`${role.toLowerCase()}s?Apage=${newPage}`);
      }
      else {
        router.push(`${role.toLowerCase()}s?Ppage=${newPage}`);

      }
    }
  }

  const handleAccept=async()=>{
    const res = await AcceptActor({id:selectedActor.id})
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
    setSelecetdActor(null);
  }
  

  const handleDecline=async()=>{
    const res = await DeclineActor({id:selectedActor.id})
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
    setSelecetdActor(null);
  }
  



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
          {Actors.map((actor) => (
            <TableRow key={actor.id}>
              <TableCell className="font-medium">Dr. {actor.name}</TableCell>
              <TableCell className="hidden sm:table-cell">{actor.email}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" onClick={() => setSelecetdActor(actor)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Toaster />
      </Table>
      {selectedActor && (
      <DoctorModal role={role} doctor={selectedActor} onClose={() => setSelecetdActor(null)} onAccept={handleAccept} onDecline={handleDecline} />
)}
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
    </div>
  )
}


