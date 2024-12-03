import React from 'react'
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  selected?: Date
  onSelect: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ selected, onSelect, className }: DatePickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    inputRef.current?.showPicker()
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.valueAsDate
    onSelect(date ?? undefined)
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        ref={inputRef}
        type="date"
        value={selected ? selected.toISOString().split('T')[0] : ''}
        onChange={handleDateChange}
        className="w-full "
      />
  
    </div>
  )
}

