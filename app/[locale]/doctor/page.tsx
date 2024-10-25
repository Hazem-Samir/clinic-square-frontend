import { DashboardPage } from "@/components/DashboardPage";
import BlurFade from "@/components/ui/blur-fade";
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

import ReservationsTable from "@/components/ReservationsTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { cookies } from "next/headers";

const getReservations = async (limit:number,page: number, date: string) => {
  const token = getToken();
  console.log("token", token);
  console.log(date)
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    date: date,
  }).toString();
  const response = await fetch(`/api/doctor/reservations?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reservations');
  }

  const res = await response.json();
  console.log(res);
  return res;
}


export default async function Home() {


  return (
    <ProtectedRoute allowedRoles={['doctor']}>

    <BlurFade delay={0}  inView>
      <main className="flex flex-1 flex-col gap-2 p-2 sm:gap-4 sm:p-4 md:gap-8 md:p-8">
        <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Revenue />
          <Patients />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <ReservationsTable />
      </main>
      </BlurFade>
    </ProtectedRoute>
  );
}