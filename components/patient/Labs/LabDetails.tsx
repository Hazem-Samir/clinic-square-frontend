"use client"

import { MapPin, Phone, TestTubeDiagonal, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast, Toaster } from 'react-hot-toast'
import Image from 'next/image'
import { HandleTimeFormat } from '@/schema/Essentials'
import useCartStore from '@/lib/cart'
import { useState } from "react"
import Spinner from '@/components/Spinner'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Test {
  id: string;
  test: {
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

export default function LabDetails({ Lab, Tests }: IProps) {
  // const [currentLicenseIndex, setCurrentLicenseIndex] = useState(0)
  const { addToCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [testId,setTestID] = useState<string|null>(null)
console.log(Tests)
console.log(Tests)
  const handleAddToCart = async (testId: string) => {
    setIsLoading(true)
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
    setIsLoading(false)
  }

  // const nextLicense = () => {
  //   setCurrentLicenseIndex((prevIndex) => 
  //     prevIndex === Lab.license.length - 1 ? 0 : prevIndex + 1
  //   )
  // }

  // const prevLicense = () => {
  //   setCurrentLicenseIndex((prevIndex) => 
  //     prevIndex === 0 ? Lab.license.length - 1 : prevIndex - 1
  //   )
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <Image
                src={Lab.profilePic ? Lab.profilePic : "/placeholder.svg"}
                alt={Lab.name}
                priority
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

      {/* <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">License & Certifications</h2>
          <div className="relative w-full max-w-sm mx-auto">
            <div className="relative aspect-[3/4] w-full max-w-[288px] mx-auto">
              <Image
                src={Lab.license[currentLicenseIndex]}
                alt={`License ${currentLicenseIndex + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 288px, 384px"
                quality={100}
              />
            </div>
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 backdrop-blur-sm"
                disabled={currentLicenseIndex === 0}
                onClick={prevLicense}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 backdrop-blur-sm"
                disabled={currentLicenseIndex === Lab.license.length - 1}
                onClick={nextLicense}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-center mt-2 text-sm text-gray-500">
            License {currentLicenseIndex + 1} of {Lab.license.length}
          </p>
        </CardContent>
      </Card> */}
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Available Tests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Tests.map((test) => (
          <Card key={test.id} className="flex flex-col">
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
            <CardFooter className="pt-0">
              <Button 
                className="w-full" 
                onClick={() => {
                  setTestID(test.id)
                  handleAddToCart(test.id)
                }} 
                disabled={isLoading}
              >
                {isLoading && testId === test.id ? (
                  <Spinner />
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
      <Toaster />
    </div>
  )
}

