"use client"

import { useState } from 'react'
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Doctor {
  id: string;
  profilePic: string;
  name: string;
  specialization: string;
  address: string[];
  rating?: number;
  reviews?: number;
}

interface IProps {
  currentPage: number;
  totalPages: number;
  Doctors: Doctor[];
}

export default function DoctorsList({ Doctors, currentPage, totalPages }: IProps) {
    const router = useRouter();

console.log(Doctors)

      const handlePageChange = (newPage: number) => {
            router.push(`patient/our-doctors?page=${newPage}`);
          };
        
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Doctors.map((doctor) => (
          <Card key={doctor.id} className="flex flex-col h-[500px]">
            <CardContent className="p-0 flex-grow">
              <div className="relative w-full h-48">
                <Image
                  src={doctor.profilePic}
                  alt={doctor.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-sm text-gray-500">{doctor.specialization}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">{doctor.rating || 'N/A'}</span>
                  {/* <span className="ml-1 text-sm text-gray-500">({doctor.reviews || 0} reviews)</span> */}
                </div>
                <Accordion type="single" collapsible className="w-full mt-4">
                  <AccordionItem value="address">
                    <AccordionTrigger className="text-sm py-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        Addresses
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {doctor.address.map((address, index) => (
                         <div className="flex items-center mt-2">
                         <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="ml-1 text-sm">{address}</span>
                       </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/patient/our-doctors/${doctor.id}`} className="w-full">
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