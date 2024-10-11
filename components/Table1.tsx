"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ShowReservation from "@/components/ShowReservation"
import SearchBar from "@/components/ui/SearchBar"

export default function Table1() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-0">
          <CardTitle className="text-base sm:text-lg">Reservations</CardTitle>
          <SearchBar />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:gap-8">
    
      <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="max-[350px]:hidden  sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 sm:gap-1">
            <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
            <p className="max-[400px]:hidden  text-xs sm:text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className=" ml-auto font-medium">
            <ShowReservation size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="max-[350px]:hidden  sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 sm:gap-1">
            <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
            <p className="max-[400px]:hidden  text-xs sm:text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className=" ml-auto font-medium">
            <ShowReservation size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="max-[350px]:hidden  sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 sm:gap-1">
            <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
            <p className="max-[400px]:hidden  text-xs sm:text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className=" ml-auto font-medium">
            <ShowReservation size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="max-[350px]:hidden  sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 sm:gap-1">
            <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
            <p className="max-[400px]:hidden  text-xs sm:text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className=" ml-auto font-medium">
            <ShowReservation size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="max-[350px]:hidden  sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 sm:gap-1">
            <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
            <p className="max-[400px]:hidden  text-xs sm:text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className=" ml-auto font-medium">
            <ShowReservation size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="max-[350px]:hidden  sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 sm:gap-1">
            <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
            <p className="max-[400px]:hidden  text-xs sm:text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className=" ml-auto font-medium">
            <ShowReservation size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="max-[350px]:hidden  sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 sm:gap-1">
            <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
            <p className="max-[400px]:hidden  text-xs sm:text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className=" ml-auto font-medium">
            <ShowReservation size="sm" />
          </div>
        </div>
          <div className="flex items-center gap-2 sm:gap-4">
          <Avatar className="max-[350px]:hidden  sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 sm:gap-1">
            <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
            <p className="max-[400px]:hidden  text-xs sm:text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className=" ml-auto font-medium">
            <ShowReservation size="sm" />
          </div>
        </div>
        {/* Repeat the above structure for other entries */}
        {/* Jackson Lee */}
        {/* Isabella Nguyen */}
        {/* William Kim */}
        {/* Sofia Davis */}
      </CardContent>
    </Card>
  )
}