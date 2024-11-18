"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Settings, LogOut, Menu } from 'lucide-react'
import { ModeToggle } from '../ui/ModeToggle'
import { getUser } from '@/lib/auth'
import LanguageSwitcherIcon from '../LanguageSwitcherIcon'

export default function Component() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState({})
  
  useEffect(() => {
    setUser(getUser());
  }, [])
  
  const menuItems = [
    { href: "/appointments", label: "Appointments" },
    { href: "/messages", label: "Messages" },
    { href: "/profile", label: "Profile" },
  ]

  return (
    <nav className="flex items-center justify-between p-4 bg-background shadow-sm">
      <div className="text-2xl font-bold text-primary">Clinic Square</div>
      <div className="flex items-center">
        {/* Desktop menu */}
        <div className="hidden md:flex items-center">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-foreground hover:text-primary transition-colors px-3 py-2 `}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse ml-4 rtl:ml-0 rtl:mr-4">
          <LanguageSwitcherIcon />
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-10 h-10 rounded-full p-0">
                <Image
                  src={user.profilePic || "/placeholder.svg?height=40&width=40"}
                  alt="Profile picture"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Mobile menu trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2 rtl:mr-2 rtl:ml-0">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors px-3 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}