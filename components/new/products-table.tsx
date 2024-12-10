"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchBar from "../ui/SearchBar"
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Accept, AcceptProduct, Decline, DeclineProduct } from "@/lib/admin/clientApi"
import Pagination from "../Pagination"
import { DashboardCharts } from "./dashboard-charts"
import { DashboardHeader } from "./components_dashboard-header"
import { ProductModal } from "./product-modal"

type type= "Medicine" | "Test" 


interface IProduct {
  id:string
  name: string
  category: string
  user: string
  photo?: string
  state: boolean
  cost?: number
}

interface IProps{
  type: type
  Products: IProduct[]
  currentPage:number
  totalPages:number
}


export function ProductsTable({Products,currentPage,totalPages,type}:IProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProuct] = useState<IProduct|null>(null)
  const router = useRouter();

  // const filteredproducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  const handlePageChange=(newPage:number)=>{
    if(type==="Medicine"){

      router.push(`medicines?page=${newPage}`);
    }
    else   if(type==="Test"){

      router.push(`tests?page=${newPage}`);
    }
  }

  const handleAccept=async()=>{
    const res = await AcceptProduct({id:selectedProduct.id,type:type.toLowerCase()})
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
    setSelectedProuct(null);
  }
  

  const handleDecline=async()=>{
    const res = await DeclineProduct({id:selectedProduct.id,type:type.toLowerCase()})
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
    setSelectedProuct(null);
  }
  


  return (

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Name</TableHead>
              <TableHead className="hidden sm:table-cell w-[40%]">{type==="Medicine"? "Category":"User Email"}</TableHead>
              <TableHead className="text-right w-[20%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{type==="Medicine"?product.category:product.user}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" onClick={() => setSelectedProuct(product)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Toaster />
        </Table>
        {selectedProduct && (
        <ProductModal type={type} product={selectedProduct} onClose={() => setSelectedProuct(null)} onAccept={handleAccept} onDecline={handleDecline} />
      )}
          <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
      </div>
    )
}

function ProductsTableContent({ products, setSelectedProuct,currentPage,totalPages,handlePageChange,type }:{products:IProduct[], setSelectedProuct: (product:IProduct)=>void,handlePageChange:(newPage:number)=>void ,currentPage:number,totalPages:number,type:type }) {

 
}

