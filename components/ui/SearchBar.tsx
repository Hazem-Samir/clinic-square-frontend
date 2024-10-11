import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SearchBar =()=>{
      return(
         <form className="ml-1 w-full max-w-fit mr-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-[10px] h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for Patient"
                  className="w-full h-9 appearance-none bg-background pl-8 pr-3 shadow-none rounded-full"
                  />
              </div>
            </form> 
      )
}

export default SearchBar