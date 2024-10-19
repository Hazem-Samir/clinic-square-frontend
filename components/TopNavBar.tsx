import Link from "next/link"
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  DollarSign,
  CreditCard,
  Activity,CalendarCheck,History,Hospital,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "./ui/ModeToggle"
import { WelcomeUser } from "./WelcomUser"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const TopNavBar = () => {
  return (
    <header className="flex h-12 sm:h-14 items-center gap-1 border-b bg-muted/40 px-2 sm:px-4 lg:h-[60px] lg:px-6">
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
        <SheetContent side="left" className="w-[80vw] sm:w-[300px] flex flex-col">
          <nav className="grid gap-1 sm:gap-2 text-sm sm:text-base font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-base sm:text-lg font-semibold"
            >
              <Hospital className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="">Clinic Square</span>
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              Home
            </Link>
            <Link
            href="/doctor/reservations-history"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <History className="h-4 w-4 sm:h-5 sm:w-5" />
              Reservations History
              {/* <Badge className="ml-auto flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full">
                6
              </Badge> */}
            </Link>
            <Link
              href="/doctor/my-schedule"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <CalendarCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              Set Schedule
            </Link>
            {/* <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-4 w-4 sm:h-5 sm:w-5" />
              Analytics
            </Link> */}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex-1" />
      <div className="flex items-center justify-between w-full">
        <WelcomeUser />
        <div className="flex items-center">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href='/doctor/profile'>  <DropdownMenuItem> Profile
            </DropdownMenuItem></Link>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar