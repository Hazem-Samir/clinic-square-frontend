"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import { MapPin, Phone, Banknote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'
import { getUser } from '@/lib/auth'
import { DaysOfWeek, HandleTimeFormat } from '@/schema/Essentials'
import toast, { Toaster } from 'react-hot-toast'
import { BookSession } from '@/lib/patient/clientApi'
interface ScheduleDay {
  day: string;
  startTime: string;
  endTime: string;
  limit: string;
}

interface Doctor {
  schedule: {
    days: ScheduleDay[];
    cost: number;
  };
  id: string;
  profilePic: string;
  name: string;
  specialization: string;
  address: string[];
  rating?: number;
  reviews?: number;
  license: string[];
  phoneNumbers: string[];
  gender: string;
  email: string;
  about: string;
}

interface IProps {
  Doctor: Doctor;
}

const DoctorInfo = ({ doctor }: { doctor: Doctor }) => (
  <div>
    <h1 className="text-3xl font-bold">{doctor.name}</h1>
    <p className="text-xl text-gray-600 mb-2">{doctor.specialization}</p>
    <p className="text-sm text-gray-500 mb-4">{doctor.about}</p>
    <div className="flex items-center mb-4">
      <Star className="w-5 h-5 text-yellow-400 fill-current" />
      <span className="ml-1 text-lg">{doctor.rating}</span>
    </div>
    <div className="flex items-center">
      <Banknote className="w-5 h-5 text-gray-400" />
      <span className="ml-2">{doctor.schedule.cost} EGP - Per Session</span>
    </div>
  </div>
)

const LocationInfo = ({ addresses }: { addresses: string[] }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Locations</h3>
    {addresses.map((address, index) => (
      <p key={index} className="flex items-center mb-2">
        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
        {address}
      </p>
    ))}
  </div>
)

const ContactInfo = ({ phoneNumbers }: { phoneNumbers: string[] }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
    {phoneNumbers.map((phone, index) => (
      <p key={index} className="flex items-center mb-2">
        <Phone className="w-5 h-5 text-gray-400 mr-2" />
        {phone}
      </p>
    ))}
  </div>
)

const ScheduleInfo = ({ days }: { days: ScheduleDay[] }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Schedule</h3>
    <div className="grid grid-cols-2 gap-4">
      {days.map(day => (
        <div key={day.day} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4">
          <p className="capitalize font-semibold">{day.day}</p>
          <p>{HandleTimeFormat(day.startTime)} - {HandleTimeFormat(day.endTime)}</p>
        </div>
      ))}
    </div>
  </div>
)

const LicenseInfo = ({ licenses }: { licenses: string[] }) => {
  const [currentLicenseIndex, setCurrentLicenseIndex] = useState(0)

  const nextLicense = useCallback(() => {
    setCurrentLicenseIndex((prevIndex) => 
      prevIndex === licenses.length - 1 ? 0 : prevIndex + 1
    )
  }, [licenses.length])

  const prevLicense = useCallback(() => {
    setCurrentLicenseIndex((prevIndex) => 
      prevIndex === 0 ? licenses.length - 1 : prevIndex - 1
    )
  }, [licenses.length])

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">License & Certifications</h3>
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative w-72 h-72 mx-auto">
          <Image
            src={licenses[currentLicenseIndex]}
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
          onClick={prevLicense}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous license</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
          onClick={nextLicense}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next license</span>
        </Button>
      </div>
      <p className="text-center mt-2 text-sm text-gray-500">
        License {currentLicenseIndex + 1} of {licenses.length}
      </p>
    </div>
  )
}

export default function DoctorDetails({ Doctor }: IProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableDates, setAvailableDates] = useState<Date[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const {name:PatientName, phoneNumbers:PatientPhoneNumbers} = getUser();

  const getNextFourDates = useCallback((day: string) => {
    const dayIndex = DaysOfWeek.indexOf(day.toLowerCase());
    const today = new Date();
    const dates: Date[] = [];
    let currentDate = new Date(today);

    while (dates.length < 4) {
      if (currentDate.getDay() === dayIndex) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, []);



  useEffect(() => {
    if (selectedDay) {
      const dates = getNextFourDates(selectedDay);
      setAvailableDates(dates);
    }
  }, [selectedDay, getNextFourDates]);

  const handleBook = useCallback(async() => {


    setIsLoading(true);
    const res = await BookSession({doctor:Doctor.id,date:new Date(selectedDate.setHours(0,0,0,0)).toISOString()})
    if (res.success ===true) {
      console.log(res.message)
          toast.success(res.message, {
                duration: 2000,
                position: 'top-center',
            })
          
      } else {
            res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
                  duration: 2000,
                  position: 'top-center',
            }))
      }
      setIsBookingOpen(false);
      setSelectedDay("");
      setSelectedDay(null)
    setIsLoading(false);


  }, [selectedDay, selectedDate, Doctor.id]);

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }, []);

  const memoizedDoctorInfo = useMemo(() => <DoctorInfo doctor={Doctor} />, [Doctor]);
  const memoizedLocationInfo = useMemo(() => <LocationInfo addresses={Doctor.address} />, [Doctor.address]);
  const memoizedContactInfo = useMemo(() => <ContactInfo phoneNumbers={Doctor.phoneNumbers} />, [Doctor.phoneNumbers]);
  const memoizedScheduleInfo = useMemo(() => <ScheduleInfo days={Doctor.schedule.days} />, [Doctor.schedule.days]);
  const memoizedLicenseInfo = useMemo(() => <LicenseInfo licenses={Doctor.license} />, [Doctor.license]);

  return (
      
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                  <Image
                    src={Doctor.profilePic}
                    alt={Doctor.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
                {memoizedDoctorInfo}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">About the Doctor</h2>
              <div className="space-y-4">
                {memoizedLocationInfo}
                {memoizedContactInfo}
                {memoizedScheduleInfo}
                {memoizedLicenseInfo}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Booking Information</h2>
              <Button className="w-full mb-4" onClick={() => setIsBookingOpen(true)}>
                Book Examination
              </Button>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Fees</span>
                  <span>{Doctor.schedule.cost} EGP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book an Appointment with {Doctor.name}</DialogTitle>
            <DialogDescription>
              Select an available date for your appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Patient Name: {PatientName}</Label>
            </div>
            <div>
              <Label>Patient Phone: {PatientPhoneNumbers.length > 1 ? PatientPhoneNumbers.map((phone:string) => `${phone} - `) : PatientPhoneNumbers[0]}</Label>
            </div>
            <div>
              <Label>Select Day</Label>
              <RadioGroup onValueChange={setSelectedDay} className="grid grid-cols-2 gap-2 mt-2">
                {Doctor.schedule.days.map(day => (
                  <div key={day.day}>
                    <RadioGroupItem value={day.day} id={day.day} className="peer sr-only" />
                    <Label
                      htmlFor={day.day}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="capitalize">{day.day}</span>
                      <span className="text-sm">{HandleTimeFormat(day.startTime)} - {HandleTimeFormat(day.endTime)}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {selectedDay && (
              <div>
                <Label>Select Date</Label>
                <Select onValueChange={(value) => setSelectedDate(new Date(value))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date.toISOString()} value={date.toISOString()}>
                        {formatDate(date)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleBook} disabled={!selectedDay || !selectedDate}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
      
  )
}