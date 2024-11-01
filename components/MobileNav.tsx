'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  History,
  CalendarCheck,
  Hospital,
  Menu,
  MessageCircleQuestion,
} from "lucide-react"
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from "next/link"
import { useEffect, useState } from 'react'
const MobileNav = () => {
  const segment = useSelectedLayoutSegment()
  const [dir, setDir] = useState('ltr')
  useEffect(() => {
    // Access document only after component has mounted
    setDir(document.documentElement.dir || 'ltr')
  }, [])


  const navItems = [
    { href: "/doctor", icon: Home, label: "Home" },
    { href: "/doctor/reservations-history", icon: History, label: "Reservations History" },
    { href: "/doctor/my-schedule", icon: CalendarCheck, label: "My Schedule" },
    { href: "/doctor/medical-questions", icon: MessageCircleQuestion, label: "Medical Questions" },

  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={dir === 'rtl' ? 'right' : 'left'} className="w-[80vw] sm:w-[300px] flex flex-col">
        <nav className="grid gap-1 sm:gap-2 text-sm sm:text-base font-medium  space-y-1 ">
        <Link
              href="#"
              className="flex items-center gap-2 text-base sm:text-lg font-semibold"
            >
              <Hospital className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="">Clinic Square</span>
            </Link>

          {navItems.map((item) => {
            const isActive = segment === item.href.split('/')[2] || (segment === null && item.href === '/doctor')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-2 sm:px-3 py-1 sm:py-2 transition-all
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.5)]' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
              >
                <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav