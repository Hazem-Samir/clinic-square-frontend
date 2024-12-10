"use client"

import { useState } from 'react'
import { MapPin, Phone, Clock, TestTubeDiagonal, ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from 'next/image'
import { HandleTimeFormat } from '@/schema/Essentials'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import { toast, Toaster } from 'react-hot-toast'
import useCartStore from '@/lib/cart'

interface Medicine {
  id: string;
  medicine:{
    id: string;
    name: string;
    cost: string;
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

interface Pharmacy {
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
  Pharmacy: Pharmacy;
  Medicines: Medicine[];
  currentPage: number;
  totalPages: number;
}

export default function PharmacyDetails({Pharmacy, Medicines, currentPage, totalPages}: IProps) {
  const [currentLicenseIndex, setCurrentLicenseIndex] = useState(0)
  const {cart,updateMedicineQuantity,  addToCart } = useCartStore();


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

  const nextLicense = () => {
    setCurrentLicenseIndex((prevIndex) => 
      prevIndex === Pharmacy.license.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevLicense = () => {
    setCurrentLicenseIndex((prevIndex) => 
      prevIndex === 0 ? Pharmacy.license.length - 1 : prevIndex - 1
    )
  }

  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <Image
                src={Pharmacy.profilePic ? Pharmacy.profilePic : "/placeholder.svg"}
                alt={Pharmacy.name}
                priority
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{Pharmacy.name}</h1>
              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold">Locations</h2>
                {Pharmacy.address.map((location, index) => (
                  <p key={index} className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    {location}
                  </p>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                {Pharmacy.phoneNumbers.map((phone, index) => (
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


{/* 
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">License & Certifications</h2>
          <div className="relative w-full max-w-sm mx-auto">
            <div className="relative aspect-[3/4] w-full max-w-[288px] mx-auto">
              <Image
                src={Pharmacy.license[currentLicenseIndex]}
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
                disabled={currentLicenseIndex === Pharmacy.license.length - 1}
                onClick={nextLicense}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-center mt-2 text-sm text-gray-500">
            License {currentLicenseIndex + 1} of {Pharmacy.license.length}
          </p>
        </CardContent>
      </Card> */}

      <h2 className="text-2xl font-semibold mb-4">Available medicines</h2>
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
            <CardFooter>
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
              
            </CardFooter>
          </Card>
        ))}
      </div>
      <Toaster />
    </div>
  )
}