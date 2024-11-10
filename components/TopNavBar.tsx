import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./ui/ModeToggle"
import { WelcomeUser } from "./WelcomUser"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { cookies } from 'next/headers'; // Import cookies function from Next.js
import { shortName } from "@/lib/utils"
import LanguageSwitcherIcon from "./LanguageSwitcherIcon"
import { logout } from "@/actions/logout"
import MobileNav from "./MobileNav"
interface NavItem {
  href: string;
  icon: string;
  label: string;
}

interface IProps {
  navItems: NavItem[];
}
const TopNavBar = ({navItems}:IProps) => {

  const cookieStore = cookies();
  const userCookie = cookieStore.get('user'); // Assuming the user info is stored in 'user' cookie
  
  // Extract the user name if the cookie exists
let user;
  if (userCookie) {
     user = JSON.parse(userCookie.value); // Parse cookie if it's stored as a JSON object
     // Get the name from the user object
  }
  return (
    <header className="flex h-12 sm:h-14 items-center gap-1 border-b bg-muted/40 px-2 sm:px-4 lg:h-[60px] lg:px-6">
      <MobileNav navItems={navItems} role={user.role}/>
      <div className="flex-1" />
      <div className="flex items-center justify-between w-full">
        <WelcomeUser name={user.name} />
        <div className="flex items-center">
          <LanguageSwitcherIcon />
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarImage src={user? user.profilePic : "https://github.com/shadcn.png"} alt={user? user.name : "@shadcn"} />
                  <AvatarFallback>{shortName(user.name)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/${user.role}/profile`} >  <DropdownMenuItem className="cursor-pointer"> Profile
            </DropdownMenuItem></Link>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>  <form action={logout}>
              <Button variant="ghost" className="h-5" type="submit">
                Logout
              </Button>
            </form></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar