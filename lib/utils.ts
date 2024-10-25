import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortName (name:String){
 let newName= name.split(" ");
 return `${newName[0][0]+newName[1][0]}`
}
