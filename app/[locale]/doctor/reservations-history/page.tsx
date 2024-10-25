import { DashboardPage } from "@/components/DashboardPage";

import Image from "next/image";
import Revenue from "@/components/Charts/Revenue"
import Patients from "@/components/Charts/Patients"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  Activity,
} from "lucide-react"

import ReservationsHisotryTable from "@/components/ReservationsHisotryTable";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ReservationsHistory() {
  return (

         <ProtectedRoute allowedRoles={['doctor']}>

      <main className="flex flex-1 flex-col gap-2 p-2  sm:gap-4 sm:p-4 md:gap-8 md:p-8">
   
      
        <ReservationsHisotryTable />
      
      </main>
         </ProtectedRoute>
  );
}