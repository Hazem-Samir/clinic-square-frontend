'use client'

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trash2, Edit2 } from "lucide-react"
import { ConvertTimeToDate, DaysOfWeek, DayValue, HandleTimeFormat } from "@/schema/Essentials"
import { DoctorScheduleschema, DoctorScheduleschemaValue } from "@/schema/Doctor"
import { addDay, DeleteDay, UpdateDay } from "@/lib/lab/clientApi"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Spinner from "../Spinner"

interface IProps {
  days: DayValue[];
}

function ScheduleForm({ onSubmit, availableDays, isLoading, initialData }: { onSubmit: (data: DayValue) => void, availableDays: string[], isLoading: boolean, initialData?: DayValue }) {
  const t = useTranslations('schedule')

  const form = useForm<DoctorScheduleschemaValue>({
    resolver: zodResolver(DoctorScheduleschema.pick({ days: true })),
    defaultValues: {
      days: initialData ? [initialData] : [{ day: "", startTime: "", endTime: "", limit: 0 }],
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data.days[0]))} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-1">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="days.0.day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">{t('selectDay')}</FormLabel>
                  <Select disabled={initialData?true:false} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={isLoading} className="text-sm sm:text-base">
                        <SelectValue placeholder={t('selectDay')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableDays.map(day => (
                        <SelectItem key={day} value={day} className="text-sm sm:text-base">
                          {t(`days.${day}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="days.0.limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Patient Limit</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} type="number" min={1} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="days.0.startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">{t('startTime')}</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="time" {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="days.0.endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">{t('endTime')}</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="time" {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full text-sm sm:text-base py-2 sm:py-3">{isLoading?<Spinner/>:(initialData ? t('updateSchedule') : t('addToSchedule'))}</Button>
      </form>
    </Form>
  )
}

export default function Schedule({ days }: IProps) {
  const t = useTranslations('schedule')
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [currentEditingItem, setCurrentEditingItem] = useState<DayValue | null>(null)


  const availableDays = DaysOfWeek.filter(day => !days.find(item => item.day === day))

  const handleAddSchedule = async(data: DayValue) => {
    setIsLoading(true);
    data.startTime=ConvertTimeToDate(data.startTime)
    data.endTime=ConvertTimeToDate(data.endTime)
    const res = await addDay(data)
    if (res.success ===true) {
      router.refresh()
      toast.success(res.message, {
        duration: 2000,
        position: 'bottom-center',
      })
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }))
    }
    setIsLoading(false);
  }


  const handleDeleteDay = (day: DayValue) => {
    setCurrentEditingItem(day)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async() => {
    setIsLoading(true);
    if (currentEditingItem) {
      const res = await DeleteDay({day:currentEditingItem.day})
      if (res.success === true) {
        router.refresh()
        toast.success(res.message, {
          duration: 2000,
          position: 'bottom-center',
        })
      } else {
        res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
          duration: 2000,
          position: 'bottom-center',
        }))
      }
      setIsLoading(false);
      setIsDeleteModalOpen(false)
      setCurrentEditingItem(null)
    }
  }

  const handleUpdateDay = (day: DayValue) => {
    setCurrentEditingItem(day)
    setIsUpdateModalOpen(true)
  }

  const confirmUpdate = async (data: DayValue) => {
    setIsLoading(true);
    data.startTime=ConvertTimeToDate(data.startTime)
    data.endTime=ConvertTimeToDate(data.endTime)
    const res = await UpdateDay(data)
    if (res.success === true) {
      router.refresh()
      toast.success(res.message, {
        duration: 2000,
        position: 'bottom-center',
      })
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }))
    }
    setIsLoading(false);
    setIsUpdateModalOpen(false)
    setCurrentEditingItem(null)
  }

  return (
    <>
        <Card className="w-full h-full max-h-[90vh] sm:max-h-[95vh]">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-bold">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <ScrollArea className="h-[calc(90vh-8rem)] sm:h-[calc(95vh-10rem)] pr-2 sm:pr-4">
              <div className="space-y-4 sm:space-y-6">
                <ScheduleForm availableDays={availableDays} onSubmit={handleAddSchedule} isLoading={isLoading} />
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <h3 className="text-base sm:text-lg font-semibold">{t('currentSchedule')}</h3>
                 
                  </div>
                  <div className="space-y-2">
                    {days.map((item) => (
                      <div key={item.day} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b space-y-2 sm:space-y-0">
                        <span className="text-sm sm:text-base font-medium">{t(`days.${item.day}`)}</span>
                        <span className="text-sm sm:text-base">{HandleTimeFormat(item.startTime)} - {HandleTimeFormat(item.endTime)}</span>
                        <div className="flex space-x-2">
                          <Button disabled={isLoading} variant="outline" size="sm" onClick={() => handleUpdateDay(item)}>
                            <Edit2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Edit</span>
                          </Button>
                          <Button disabled={isLoading} variant="outline" size="sm" onClick={() => handleDeleteDay(item)}>
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">{t('confirmDeletion')}</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {t('deleteConfirmation', { day: currentEditingItem ? t(`days.${currentEditingItem.day}`) : '' })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button disabled={isLoading} variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="text-sm sm:text-base">{t('cancel')}</Button>
              <Button variant="destructive" onClick={confirmDelete} className="text-sm sm:text-base">{isLoading?<Spinner />:(t('delete'))}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">{t('updateSchedule', { day: currentEditingItem ? t(`days.${currentEditingItem.day}`) : '' })}</DialogTitle>
            </DialogHeader>
            
            {currentEditingItem && (
              <ScheduleForm
                onSubmit={confirmUpdate}
                availableDays={[currentEditingItem.day, ...availableDays]}
                isLoading={isLoading}
                initialData={currentEditingItem}
              />
            )}
          </DialogContent>
        </Dialog>

      
      <Toaster />
      </>
  )
}