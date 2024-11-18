"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { shortName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

interface Lab {
  id: string
  name: string
  profilePic: string
  phoneNumbers: string[]
}


interface IProps {
  currentPage: number;
  totalPages: number;
  Labs: Lab[];
}


export default function LabsList({currentPage,totalPages,Labs}:IProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would fetch labs based on the search term
    // const filteredLabs = mockLabs.filter(lab => 
    //   lab.name.toLowerCase().includes(searchTerm.toLowerCase())
    // )
    // setLabs(filteredLabs)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Search for Lab Tests</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for lab tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Labs.map((lab) => (
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
      <div className="flex justify-center items-center p-4 gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          size="icon"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          size="icon"
          variant="outline"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}