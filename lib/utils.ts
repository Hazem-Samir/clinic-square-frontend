import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortName (name:String){
 let newName= name.split(" ");
 newName.length ===2 ?  `${newName[0][0]+newName[1][0]}`:  `${newName[0][0]}`
}
