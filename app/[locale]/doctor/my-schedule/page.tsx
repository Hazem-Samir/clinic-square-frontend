"use client"
import React, { useState } from "react"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trash2, Edit2, Banknote } from "lucide-react"
import BlurFade from "@/components/ui/blur-fade"
import ProtectedRoute from "@/components/ProtectedRoute"

interface ScheduleItem {
  day: string
  start: string
  end: string
}

export default function MySchedule() {
  const t = useTranslations('schedule')
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [selectedDay, setSelectedDay] = useState<string>("")
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sessionCost, setSessionCost] = useState<string>("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isCostModalOpen, setIsCostModalOpen] = useState(false)
  const [currentEditingDay, setCurrentEditingDay] = useState<ScheduleItem | null>(null)

  const availableDays = daysOfWeek.filter(day => !schedule.find(item => item.day === day))

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':')
    const hoursNum = parseInt(hours, 10)
    const ampm = hoursNum >= 12 ? 'PM' : 'AM'
    const formattedHours = hoursNum % 12 || 12
    return `${formattedHours}:${minutes} ${ampm}`
  }

  const handleAddSchedule = () => {
    const newErrors: Record<string, string> = {}
    if (!selectedDay) newErrors.day = t('selectDay')
    if (!startTime) newErrors.startTime = t('startTime')
    if (!endTime) newErrors.endTime = t('endTime')

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSchedule(prev => [...prev, { 
        day: selectedDay, 
        start: formatTime(startTime), 
        end: formatTime(endTime) 
      }])
      setSelectedDay("")
      setStartTime("")
      setEndTime("")
    }
  }

  const handleDeleteDay = (day: string) => {
    setCurrentEditingDay(schedule.find(item => item.day === day) || null)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (currentEditingDay) {
      setSchedule(prev => prev.filter(item => item.day !== currentEditingDay.day))
      setIsDeleteModalOpen(false)
      setCurrentEditingDay(null)
    }
  }

  const handleUpdateDay = (day: string) => {
    const daySchedule = schedule.find(item => item.day === day)
    if (daySchedule) {
      setCurrentEditingDay(daySchedule)
      setStartTime(convertTo24Hour(daySchedule.start))
      setEndTime(convertTo24Hour(daySchedule.end))
      setIsUpdateModalOpen(true)
    }
  }

  const convertTo24Hour = (time: string): string => {
    const [timeStr, ampm] = time.split(' ')
    let [hours, minutes] = timeStr.split(':')
    let hoursNum = parseInt(hours, 10)
    
    if (ampm === 'PM' && hoursNum !== 12) hoursNum += 12
    if (ampm === 'AM' && hoursNum === 12) hoursNum = 0

    return `${hoursNum.toString().padStart(2, '0')}:${minutes}`
  }

  const confirmUpdate = () => {
    if (currentEditingDay && startTime && endTime) {
      setSchedule(prev => prev.map(item => 
        item.day === currentEditingDay.day 
          ? { ...item, start: formatTime(startTime), end: formatTime(endTime) } 
          : item
      ))
      setIsUpdateModalOpen(false)
      setCurrentEditingDay(null)
      setStartTime("")
      setEndTime("")
    }
  }

  const handleUpdateSessionCost = () => {
    setIsCostModalOpen(true)
  }

  const confirmSessionCost = () => {
    setIsCostModalOpen(false)
  }

  return (
    <ProtectedRoute allowedRoles={['doctor']}>
      <BlurFade delay={0} inView>
        <main className="flex flex-1 flex-col gap-2 p-2 sm:gap-4 sm:p-4 md:gap-8 md:p-8">
          <Card className="w-full h-full max-h-[90vh] flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 px-1 md:col-span-2">
                      <Label htmlFor="day">{t('selectDay')}</Label>
                      <Select value={selectedDay} onValueChange={setSelectedDay}>
                        <SelectTrigger id="day">
                          <SelectValue placeholder={t('selectDay')} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDays.map(day => (
                            <SelectItem key={day} value={day}>
                              {t(`days.${day}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.day && <p className="text-red-500 text-sm mt-1">{errors.day}</p>}
                    </div>
                    <div className="space-y-2 px-1">
                      <Label htmlFor="start-time">{t('startTime')}</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full"
                      />
                      {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
                    </div>
                    <div className="space-y-2 px-1">
                      <Label htmlFor="end-time">{t('endTime')}</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full"
                      />
                      {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                    </div>
                  </div>
                  <Button onClick={handleAddSchedule} className="w-full">{t('addToSchedule')}</Button>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{t('currentSchedule')}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{t('sessionCost')}: {sessionCost || "0"} EGP</span>
                      <Button variant="outline" size="icon" onClick={handleUpdateSessionCost}>
                        <Banknote className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {schedule.map((item) => (
                      <div key={item.day} className="flex justify-between items-center py-2 border-b">
                        <span className="font-medium">{t(`days.${item.day}`)}</span>
                        <span>{item.start} - {item.end}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleUpdateDay(item.day)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeleteDay(item.day)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('confirmDeletion')}</DialogTitle>
                <DialogDescription>
                  {t('deleteConfirmation', { day: currentEditingDay ? t(`days.${currentEditingDay.day}`) : '' })}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>{t('cancel')}</Button>
                <Button variant="destructive" onClick={confirmDelete}>{t('delete')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('updateSchedule', { day: currentEditingDay ? t(`days.${currentEditingDay.day}`) : '' })}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="update-start-time">{t('startTime')}</Label>
                  <Input
                    id="update-start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-end-time">{t('endTime')}</Label>
                  <Input
                    id="update-end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>{t('cancel')}</Button>
                <Button onClick={confirmUpdate}>{t('update')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCostModalOpen} onOpenChange={setIsCostModalOpen}>
            <DialogContent>
              <DialogHeader>
                
                <DialogTitle>{t('setSessionCost')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="session-cost">{t('sessionCostLabel')}</Label>
                  <Input
                    id="session-cost"
                    type="number"
                    min={1}
                    value={sessionCost}
                    onChange={(e) => setSessionCost(e.target.value)}
                    placeholder={t('sessionCostLabel')}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCostModalOpen(false)}>{t('cancel')}</Button>
                <Button onClick={confirmSessionCost}>{t('setCost')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </BlurFade>
    </ProtectedRoute>
  )
}