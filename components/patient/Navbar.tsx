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
import { CircleUserRound, LogOut, Menu } from 'lucide-react'
import { ModeToggle } from '../ui/ModeToggle'
import { getUser } from '@/lib/auth'
import LanguageSwitcherIcon from '../LanguageSwitcherIcon'
import { logout } from '@/actions/logout'
import { CartIcon } from '../CartIcon'
import Logo from "@/public/Logo.png"

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState({})
  
  useEffect(() => {
    setUser(getUser());
  }, [])
  

  const menuItems = [
    { href: "/patient", label: "Home" },
    { href: "/patient/my-activity", label: "My Activity" },
    { href: "/patient/our-doctors", label: "Doctors" },
    { href: "/patient/labs", label: "Labs" },
    { href: "/patient/pharmacies", label: "Pharmacies" },
  ]

  return (
    <nav className="flex items-center justify-between p-4 bg-background shadow-sm">
      <div>
      <Link href="/patient" className="flex items-center">
        <Image
          src={Logo}
          alt="Clinic Square Logo"
          width={150}
          height={40}
          className="h-12 w-auto"
        />
      </Link>
    </div>
      <div className="flex items-center">
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-teal-300 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse ml-4 rtl:ml-0 rtl:mr-4">
          <div className="hidden md:flex items-center">
          <CartIcon />

          <LanguageSwitcherIcon />
          <ModeToggle />
          </div>
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
                <div className="flex items-center">
                  <CircleUserRound className="h-4 w-4" />
                  <Link href="/patient/profile" className="px-1">Profile</Link>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form action={logout} className="flex items-center">
                  <LogOut className="h-4 w-4" />                  
                  <Button variant="ghost" className="h-5 px-1" type="submit">
                    Logout
                  </Button>
                </form>
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
            <div className="flex items-center">
          <CartIcon />

          <LanguageSwitcherIcon />
          <ModeToggle />
          </div>
          
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
