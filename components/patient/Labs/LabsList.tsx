"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from 'next/link'
import { shortName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import Pagination from '@/components/Pagination'
import toast, { Toaster } from 'react-hot-toast'
import { SearchForLab, SearchForTest } from '@/lib/patient/clientApi'
import useCartStore from '@/lib/cart'
import {TestTubeDiagonal, ShoppingCart,Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Spinner from '@/components/Spinner'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Lab {
  id: string
  name: string
  profilePic: string
  phoneNumbers: string[]
}

interface Test {
  id: string;
  test: {
    id: string;
    name: string;
    cost: number;
  }
  preparations: string[];
  cost: string;
  lab:Lab
}


interface IProps {
  currentPage: number;
  totalPages: number;
  Labs: Lab[];
}
type searchT="Lab"|"Test"
interface ILabData extends IProps {
  handlePageChange:(newPage:number)=>void
  isLoading:boolean
}


interface IResult  {
  handlePageChange:(newPage:number)=>void
  isLoading:boolean
  Tests:Test[]
  currentPage: number;
  totalPages: number;
}


const LabsData=({Labs,currentPage,totalPages,handlePageChange,isLoading}:ILabData) =>{
  return(

  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Labs.length<=0?<div className="my-4 flex col-span-4 justify-center items-center">No Labs</div>

        :Labs.map((lab) => (
          <Card key={lab.id} className="flex flex-col">
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
                  <AvatarImage src={lab.profilePic} alt={lab.name} />
                  <AvatarFallback>{shortName(lab.name)}</AvatarFallback>
                </Avatar>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{lab.name}</h2>
                  <p className="text-sm text-gray-500">{lab.phoneNumbers[0]}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/patient/labs/${lab.id}`} className="w-full">
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
 const Results = ({ Tests, currentPage, handlePageChange, isLoading, totalPages }: IResult) => {
  const { addToCart } = useCartStore()

  const handleAddToCart = async (testId: string) => {
    const res = await addToCart({ testId })
    if (!res.success) {
      toast.error("You have added this test before.", {
        duration: 2000,
        position: 'bottom-center',
      })
    } else {
      toast.success("Test Added To Cart", {
        duration: 2000,
        position: 'bottom-center',
      })
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Tests.length<=0?<div className="my-4 flex col-span-4 justify-center items-center">No Tests</div>

        :Tests.map((test) => (
          <Card key={test.id}>
                <CardContent className="p-4 flex-1">
              <div className="flex items-center justify-center space-x-2 mb-3 h-10">
                <TestTubeDiagonal className="h-5 w-5 flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold leading-tight line-clamp-2">
                  {test.test.name}
                </h3>
              </div>
            
                <div className="space-y-2">
                  <h4 className="font-medium">Preparations:</h4>
                  <ScrollArea className="h-10 w-full pr-4">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {test.preparations.length>0? test.preparations.map((prep, index) => (
                        <li key={index} className="text-muted-foreground">
                          {prep}
                        </li>
                      )):<li>None</li>}
                    </ul>
                  </ScrollArea>
                </div>
                <p className="text-2xl text-center font-bold mb-3">{test.cost} EGP</p>
            
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" onClick={() => handleAddToCart(test.id)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Link href={`/patient/labs/${test.lab.id}`}   className="flex items-center space-x-2 w-full  no-underline pt-2 border-t hover:text-teal-500">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={test.lab.profilePic} alt={test.lab.name} />
                  <AvatarFallback>{shortName(test.lab.name)}</AvatarFallback>
                </Avatar>
                <span className="text-sm ">{test.lab.name}</span>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
     <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} isLoading={isLoading}/>

    </>
  )
}

export default function LabsList({currentPage,totalPages,Labs}:IProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<searchT>('')
  const [SearchResult, setSearchResult] = useState<{currentPage:number,totalPages:number,type:searchT,data:[]}|null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()


  const handleSearch =async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
   if(searchTerm.trim().length>0&&searchType!==''){
    let res;
    if(searchType==='Lab'){

      res = await SearchForLab(searchTerm,1);
    }
    else if(searchType==='Test'){
        res = await SearchForTest(searchTerm,1);
      
    }
    if (res.success === true) {
  
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
    toast.error("You have to enter text and choose what you search for", {
      duration: 2000,
      position: 'top-center',
    })
  }

  setIsLoading(false);

  }
  const handlePageChange = async(newPage: number) => {
    setIsLoading(true);
    if(SearchResult!==null&& SearchResult.totalPages>1&&searchType!==''){
      let res;
      if(searchType==='Lab'){

         res = await SearchForTest(searchTerm,newPage);
        }
        else if(searchType==='Test'){
        res = await SearchForLab(searchTerm,newPage);
        
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

  router.push(`labs?page=${newPage}`);
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
    <h1 className="text-3xl font-bold text-center mb-8">Our Labs</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for lab or tests..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); check(e)}}
            className="flex-grow"
          />
               <Select  value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-1/4 text-sm py-2 ">
                    <SelectValue placeholder="Search in" />

                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem  value="Lab">Labs</SelectItem>
                    <SelectItem value="Test">Tests</SelectItem>
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
        <Spinner invert />
      </div>
    ) : (SearchResult===null?<LabsData Labs={Labs} currentPage={currentPage} handlePageChange={handlePageChange} isLoading={isLoading} totalPages={totalPages} />
      :(SearchResult.type==='Lab'?<LabsData Labs={SearchResult.data} currentPage={SearchResult.currentPage} handlePageChange={handlePageChange} isLoading={isLoading} totalPages={SearchResult.totalPages} />
        :(SearchResult.type==='Test'?<Results Tests={SearchResult.data} currentPage={SearchResult.currentPage} handlePageChange={handlePageChange} isLoading={isLoading} totalPages={SearchResult.totalPages} />:null)))}
    <Toaster />
    </div>
  )
}