"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from 'next/link'
import { shortName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import Pagination from '@/components/Pagination'
import toast, { Toaster } from 'react-hot-toast'
import { SearchForMedicine, SearchForPharmacy } from '@/lib/patient/clientApi'
import useCartStore from '@/lib/cart'
import { ShoppingCart } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Spinner from '@/components/Spinner'
interface Pharmacy {
  id: string
  name: string
  profilePic: string
  phoneNumbers: string[]
}

interface Medicine {
  id: string;
  medicine:{
    id: string;
    name: string;
    cost: string;
  }
  preparations: string[];
  cost: string;
  pharmacy:Pharmacy
}

interface IProps {
  currentPage: number;
  totalPages: number;
  Pharmacies: Pharmacy[];
}

interface IPharmacyData extends IProps {
  handlePageChange:(newPage:number)=>void
  isLoading:boolean
}
type searchT="Pharmacy"|"Medicine"


interface IResult  {
  handlePageChange:(newPage:number)=>void
  isLoading:boolean
  Medicines:Medicine[]
  currentPage: number;
  totalPages: number;
}




const PharmaciesData=({Pharmacies,currentPage,totalPages,handlePageChange,isLoading}:IPharmacyData) =>{
  return(

  <>
   
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Pharmacies.map((pharmacy) => (
          <Card key={pharmacy.id} className="flex flex-col">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  {/* <Image
                    src={lab.profilePic||""}
                    alt={lab.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  /> */}
                      <Avatar className="relative w-16 h-16">
                  <AvatarImage src={pharmacy.profilePic} alt={pharmacy.name} />
                  <AvatarFallback>{shortName(pharmacy.name)}</AvatarFallback>
                </Avatar>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{pharmacy.name}</h2>
                  <p className="text-sm text-gray-500">{pharmacy.phoneNumbers[0]}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/patient/pharmacies/${pharmacy.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
     <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} isLoading={isLoading}/>
  </>
  )

 }
 const Results = ({ Medicines, currentPage, handlePageChange, isLoading, totalPages }: IResult) => {
  const { addToCart } = useCartStore()


  const handleAddToCart = async (medicineId: string) => {
    const res = await addToCart({ medicineId });
    if (!res.success) {
      toast.error("Something went wrong! Try Again Later", {
        duration: 2000,
        position: 'bottom-center',
      });
    } else {
      toast.success("Medicine Added To Cart", {
        duration: 2000,
        position: 'bottom-center',
      });
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {Medicines.map((medicine) => (
          <Card key={medicine.id}>
            <CardContent className="p-4 flex flex-col items-center space-y-2">

              <div className="flex items-center space-x-1">
                <medicineTubeDiagonal size={24} />
                <h3 className="text-lg font-semibold">{medicine.medicine.name}</h3>
              </div>
              <p className="text-2xl font-bold">{medicine.medicine.cost} EGP</p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {/* {0> 0 ? (
                <div className="flex items-center justify-between w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateQuantity(medicine, false)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2 font-semibold">{getItemQuantity(medicine.id)}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateMedicineQuantity(medicine.id, medicine)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button className="w-full" onClick={() =>{ handleAddToCart(medicine.id); getItemQuantity(medicine.id)}}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              )} */}
         
                <Button className="w-full" onClick={() =>{ handleAddToCart(medicine.id);}}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Link href={`/patient/pharmacies/${medicine.pharmacy.id}`}   className="flex items-center space-x-2 w-full  no-underline pt-2 border-t hover:text-teal-500">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={medicine.pharmacy.profilePic} alt={medicine.pharmacy.name} />
                  <AvatarFallback>{shortName(medicine.pharmacy.name)}</AvatarFallback>
                </Avatar>
                <span className="text-sm ">{medicine.pharmacy.name}</span>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
     <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} isLoading={isLoading}/>

    </>
  )
}

export default function PharmaciesList({currentPage,totalPages,Pharmacies}:IProps) {
const [searchTerm, setSearchTerm] = useState('')
  const [SearchResult, setSearchResult] = useState<{currentPage:number,totalPages:number,data:[],type:searchT}|null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<searchT>('')
  const router = useRouter()


  const handleSearch =async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
   if(searchTerm.trim().length>0&&searchType!==''){
    let res;
    if(searchType==='Pharmacy'){

      res = await SearchForPharmacy(searchTerm,1);
    }
    else if(searchType==='Medicine'){
        res = await SearchForMedicine(searchTerm,1);
      
    }
    if (res.success === true) {
      // toast.success(res.message, {
      //   duration: 2000,
      //   position: 'top-center',
      // });
      console.log(res.data)
      setSearchResult({data:res.data.data,totalPages:res.data.paginationResult.numberOfPages,currentPage:res.data.paginationResult.currentPage,type:searchType})
      console.log(SearchResult)
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }));
    }
  }
  
  setIsLoading(false);
  
  }
  const handlePageChange = async(newPage: number) => {
    setIsLoading(true);
 if(SearchResult!==null&& SearchResult.totalPages>1&&searchType!==''){
      let res;
      if(searchType==='Pharmacy'){

         res = await SearchForPharmacy(searchTerm,newPage);
        }
        else if(searchType==='Medicine'){
        res = await SearchForMedicine(searchTerm,newPage);
        
      }
      if (res.success === true) {
        // toast.success(res.message, {
        //   duration: 2000,
        //   position: 'top-center',
        // });
        console.log(res.data)
        setSearchResult({data:res.data.data,totalPages:res.data.paginationResult.numberOfPages,currentPage:res.data.paginationResult.currentPage,type:searchType})
        console.log(SearchResult)
      } else {
        res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
          duration: 2000,
          position: 'bottom-center',
        }));
      }
    }
    else{

      router.push(`pharmacies?page=${newPage}`);
    }
    setIsLoading(false);
  };


  const check=(e)=>{
    if(e.target.value.trim().length===0){
      setSearchResult(null)
      // router.refresh()
      // router.refresh(`doctor?page=${currentPage}&date=${currentDate}`);
    }
  
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Pharmacies</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for pharmacies or medicines..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); check(e)}}
            className="flex-grow"
          />
            <Select  value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-1/4 text-sm py-2 ">
                    <SelectValue placeholder="Search in" />

                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem  value="Pharmacy">Pharmacies</SelectItem>
                    <SelectItem value="Medicine">Medicines</SelectItem>
                  </SelectContent>
                </Select>
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </form>
      {isLoading ? (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    ) : (SearchResult===null?<PharmaciesData Pharmacies={Pharmacies} currentPage={currentPage} handlePageChange={handlePageChange} isLoading={isLoading} totalPages={totalPages} />
:(SearchResult.type==="Pharmacy"?<PharmaciesData Pharmacies={SearchResult.data} currentPage={SearchResult.currentPage} handlePageChange={handlePageChange} isLoading={isLoading} totalPages={SearchResult.totalPages} />
:(SearchResult.type==="Medicine"?<Results Medicines={SearchResult.data} currentPage={SearchResult.currentPage} handlePageChange={handlePageChange} isLoading={isLoading} totalPages={SearchResult.totalPages} />:null)))}
    <Toaster />
  
    </div>
  )
}