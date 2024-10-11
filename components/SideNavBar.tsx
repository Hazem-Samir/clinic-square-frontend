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
import { Badge } from "@/components/ui/badge"

const SideNavBar = () => {
  return (
    <div className="hidden border-r bg-muted/40 sm:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-12 sm:h-14 items-center border-b px-2 sm:px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Hospital className="h-4 w-4 sm:h-6 sm:w-6" />
            <span className="text-sm sm:text-base">Clinic Square</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-xs sm:text-sm font-medium lg:px-4">
            <Link
              href="/doctor"
              className="flex items-center gap-3 bg-muted rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-primary  transition-all hover:text-primary"
            >
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              Home
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <History className="h-3 w-3 sm:h-4 sm:w-4" />
              Reservations History
              {/* <Badge className="ml-auto flex h-4 w-4 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[10px] sm:text-xs">
                6
              </Badge> */}
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CalendarCheck className="h-3 w-3 sm:h-4 sm:w-4" />
              Set Schedule
            </Link>
            {/* <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-3 w-3 sm:h-4 sm:w-4" />
              Analytics
            </Link> */}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default SideNavBar