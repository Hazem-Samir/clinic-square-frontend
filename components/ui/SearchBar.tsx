"use client"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRef } from 'react';
import { useRouter } from 'next/navigation'
import { EndReservationValues } from "@/schema/DoctorReservation";

interface SearchBarProps {
  onSearch: (query: string) => void;
  setSearchedReservaion:(result:EndReservationValues) => void;
}



const SearchBar = ({ onSearch ,setSearchedReservaion}: SearchBarProps) => {
  const inputRef = useRef(null);
  const router = useRouter();
const search =(e)=>{
  e.preventDefault()
  
  // onSearch(inputRef.current.value)
}

const check=(e)=>{
  if(e.target.value.length===0){

    // router.refresh(`doctor?page=${currentPage}&date=${currentDate}`);
  }
}

  return (
    <form className="ml-1 w-full max-w-fit mr-1" onSubmit={(e) => {search(e)}}>
      <div className="relative">
        <Search className="absolute left-2.5 top-[10px] h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for Patient"
          className="w-full h-9 appearance-none bg-background pl-8 pr-3 shadow-none rounded-full"
     ref={inputRef}
     onChange={e=>{check(e)}}
        />
      </div>
    </form>
  )
}

export default SearchBar