'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DoctorAppointments from '@/components/patient/MyActivity/DoctorsAppointments'
import LabAppointments from '@/components/patient/MyActivity/LabAppointments'
import PharmacyOrders from '@/components/patient/MyActivity/PharmacyOrders'


export default function MyActivity() {
  const [activeTab, setActiveTab] = useState("doctors")

  return (
  <main    className="flex-grow p-4 md:p-8 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full bg-background  text-foreground" >
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Medical Dashboard</h1>
      <Tabs defaultValue={"doctors"}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 md:mb-5 mb-24 md:space-y-0 space-y-2 md:bg-muted bg-transparent ">
          <TabsTrigger value="doctors">Doctor Appointments</TabsTrigger>
          <TabsTrigger value="labs">Lab Appointments</TabsTrigger>
          <TabsTrigger value="pharmacies">Pharmacy Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="doctors">
          <DoctorAppointments />
        </TabsContent>
        <TabsContent value="labs">
          <LabAppointments />
        </TabsContent>
        <TabsContent value="pharmacies">
          <PharmacyOrders />
        </TabsContent>
      </Tabs>
    </div>
    </main>
  )
}

