"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {  DoctorValue, DoctorScheduleSchema, DoctorScheduleValue } from "@/schema/Doctor"
import { onSignupSubmit } from "@/utils/SignupHandlers"
import { DaysOfWeek } from "@/schema/Essentials"


interface IProps {
  role: string;
  prevData: DoctorValue;
  onBack: () => void;
}

export default function DoctorSchedule({ role ,prevData,onBack}: IProps) {


  const form = useForm<DoctorScheduleValue>({
    resolver: zodResolver(DoctorScheduleSchema),
    defaultValues: {
      days: [{ day: "monday", startTime: "", endTime: "", limit: 1 }],
      cost: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "days",
  });

  const [availableDays, setAvailableDays] = useState(DaysOfWeek);

  useEffect(() => {
    const selectedDays = form.getValues().days.map(item => item.day);
    setAvailableDays(DaysOfWeek.filter(day => !selectedDays.includes(day)));
  }, [fields, form]);



  const onSubmit = (data: DoctorScheduleValue) => {
    // console.log(prevData);
    // console.log(data);
    onSignupSubmit({data:{...prevData,schedule:{...data}},role:'doctor'})
    // Handle form submission
  };

  return (
    <>  <Button type="button" variant="ghost" onClick={onBack}>
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back
  </Button>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Set Schedule</h1>
          <p className="text-balance text-muted-foreground">
            Set your schedule as a {role}.
          </p>
          <p className="text-sm text-muted-foreground">
       you can modify it later.
          </p>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Day {index + 1}</h3>
                {fields.length>1?
                <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                  Remove Day
                </Button>:null}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`days.${index}.day`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Day</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setAvailableDays(prev => prev.filter(day => day !== value));
                        }} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...availableDays, field.value].map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`days.${index}.startTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`days.${index}.endTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`days.${index}.limit`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Limit</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min={1} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (availableDays.length > 0) {
                append({ day: availableDays[0], startTime: "", endTime: "", limit: 1 });
              }
            }}
            disabled={availableDays.length === 0}
          >
            Add Another Day
          </Button>

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Cost</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min={0} step={0.01} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Complete Sign Up
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Log in
          </Link>
        </div>
      </form>
    </Form>
    </>
  );
}