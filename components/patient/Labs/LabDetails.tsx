"use client"

import { useState } from 'react'
import { MapPin, Phone, Clock, TestTubeDiagonal, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from 'next/image'
import { HandleTimeFormat } from '@/schema/Essentials'

interface Test {
  id: string;
  test:{
    id: string;
  name: string;
  cost: number;
  }
  preparations: string[];
  cost: string;
}


interface ScheduleDay {
  day: string;
  startTime: string;
  endTime: string;
  limit: string;
}

interface Lab {
  schedule: {
    days: ScheduleDay[];
  };
  id: string;
  profilePic: string;
  name: string;
  address: string[];
  rating?: number;
  reviews?: number;
  license: string[];
  phoneNumbers: string[];
  email: string;
}

interface IProps {
  Lab: Lab;
  Tests: Test[];
  currentPage: number;
  totalPages: number;
}


export default function LabDetails({Lab,Tests,currentPage,totalPages}:IProps) {
  const [currentLicenseIndex, setCurrentLicenseIndex] = useState(0)

  console.log(Lab);
  console.log(Tests);
  const nextLicense = () => {
    setCurrentLicenseIndex((prevIndex) => 
      prevIndex === Lab.license.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevLicense = () => {
    setCurrentLicenseIndex((prevIndex) => 
      prevIndex === 0 ? Lab.license.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <Image
                src={Lab.profilePic}
                alt={Lab.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{Lab.name}</h1>
              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold">Locations</h2>
                {Lab.address.map((location, index) => (
                  <p key={index} className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    {location}
                  </p>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                {Lab.phoneNumbers.map((phone, index) => (
                  <p key={index} className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    {phone}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Schedule</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Lab.schedule.days.map(day => (
              <div key={day.day} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4">
                <p className="capitalize font-semibold">{day.day}</p>
                <p>{HandleTimeFormat(day.startTime)} - {HandleTimeFormat(day.endTime)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">License & Certifications</h2>
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative w-72 h-72 mx-auto">
              <Image
                src={Lab.license[currentLicenseIndex]}
                alt={`License ${currentLicenseIndex + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="256px"
                quality={100}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-2 transform -translate-y-1/2"
              disabled={currentLicenseIndex===0}
              onClick={prevLicense}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
              disabled={currentLicenseIndex===Lab.license.length-1}
              onClick={nextLicense}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-center mt-2 text-sm text-gray-500">
            License {currentLicenseIndex + 1} of {Lab.license.length}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Available Tests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Tests.map((test) => (
          <Card key={test.id}>
            <CardContent className="p-4 flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-1">
                <TestTubeDiagonal size={24} />
              <h3 className="text-lg font-semibold ">{test.test.name}</h3>
              </div>
              <p className="text-2xl font-bold">{test.cost} EGP</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}