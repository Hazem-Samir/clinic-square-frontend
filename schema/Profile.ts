import { ImageHandler } from "@/utils/AuthHandlers"
import * as z from "zod"

export const ProfileSchema = z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      about: z.string().min(5,"About must be at least 5 characters"),
      gender: z.enum(["male", "female"]),
      dateOfBirth: z.date(),
      specialization: z.string(),
      phoneNumbers: z.array(z.string().min(1, "Phone number is required")),
      address: z.array(z.string().min(1, "Address is required")),
      profilePic: z.union([z.string(), z.custom<File>(ImageHandler, {
            message: 'Invalid image file. Must be JPEG, PNG, or GIF and less than 5MB.',
          })]).nullish(),
      license: z.array(z.union([z.string(), z.custom<File>(ImageHandler, {
            message: 'Invalid image file. Must be JPEG, PNG, or GIF and less than 5MB.',
          })])),
    }).refine((data) => !data.password || data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    })
    


    export const PasswordSchema = z.object({
     
      currentPassword: z.string().min(6, "Password must be at least 8 characters"),
      newPassword: z.string().min(6, "Password must be at least 8 characters"),
      passwordConfirm: z.string().min(6, "Password must be at least 8 characters"),
    }).refine((data) => data.newPassword === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    });
    export type ProfileValue = z.infer<typeof ProfileSchema>
    export type PasswordValue = z.infer<typeof PasswordSchema>