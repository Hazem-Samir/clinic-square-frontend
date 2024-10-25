import * as z from "zod"
import { DoctorScheduleValue, DoctorValue } from "./Doctor";
import { PatientValue } from "./Patient";
import { LabValue } from "./Lab";
import { PharmacyValue } from "./Pharmacy";

type Doctor={DoctorValue:DoctorValue,role:string,schedule:DoctorScheduleValue}
export type Accounts = PatientValue| DoctorValue| LabValue | PharmacyValue
export interface ISignUpData {
  data: Accounts;

}

export const DaysOfWeek=[
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export const userTypeSchema = z.object({
      userType: z.enum(["doctor", "patient", "lab", "pharmacy"], {
        required_error: "Please select a user type.",
      }),
    })
    

   export  const SERVER_URL = process.env.AUTH_SERVER_URL || 'https://clinic-square-apis.onrender.com/api/v1';


    export const DaySchema = z.object({
      day: z.enum(DaysOfWeek  ,{  errorMap: () => ({ message: "You have to choose day" }),}),
      startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,  "Please Enter Start Time"),
      endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please Enter End Time"),
      limit: z.coerce.number().int().positive(),
    });
    


    
    
    // Export the schema for use in your form


    export type userTypeValue =z.infer<typeof userTypeSchema>;
    
    