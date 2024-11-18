"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { shortName } from '@/lib/utils'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { CalendarDays, ChevronLeft, ChevronRight, PlusCircle } from "lucide-react"
import {
      Form,
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from "@/components/ui/form"
    import {
      useForm
    } from "react-hook-form"
    import {
      zodResolver
    } from "@hookform/resolvers/zod"
    import * as z from "zod"
import { getUser } from '@/lib/auth'
import { AddQuestion } from '@/lib/patient/clientApi'
    const formSchema = z.object({
      question: z.string().min(2,"Question is Required")
    });
import toast, { Toaster } from 'react-hot-toast'
import Spinner from '@/components/Spinner'
    
    
interface IProps {
  questions: Question[];
  currentPage: number;
  totalPages: number;
}

interface Question {
  id: number;
  patient: {
    name: string;
    profilePic: string;
  };
  question: string;
}

export default function QuestionsList({ questions, currentPage, totalPages }: IProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const form = useForm < z.infer < typeof formSchema >> ({
      resolver: zodResolver(formSchema),
      defaultValues: {
            question: "",
          },
    })
  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    router.push(`medical-questions?page=${newPage}`);
    setIsLoading(false);
  };

  const handleAddQuestion = async(data:z.infer < typeof formSchema >) => {
    // Here you would typically send the new question to your backend
    const user = getUser();

    setIsLoading(true);
    const res = await AddQuestion({question:data.question,patient:user.id});
    if (res.success === true) {
      toast.success(res.message, {
        duration: 2000,
        position: 'top-center',
      });
      router.refresh();
    } else {
      res.message.forEach((err: string) => toast.error(err || 'An unexpected error occurred.', {
        duration: 2000,
        position: 'bottom-center',
      }));
    }
    setIsLoading(false);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Questions</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Add New Question</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddQuestion)} className="space-y-8 max-w-3xl mx-auto ">
        
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input 
                placeholder="Enter Your Question"
                disabled={isLoading}
                type=""
                {...field} />
              </FormControl>
              <FormDescription>
                Enter your medical question below. We'll do our best to answer it promptly.
                </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>{isLoading?<Spinner/>:"Submit"}</Button>
      </form>
    </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((q) => (
          <Link href={`/patient/medical-questions/${q.id}`} key={q.id} className="block h-full hover:drop-shadow-2xl">
            <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
              <CardHeader className="flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={q.patient.profilePic} alt={q.patient.name} />
                    <AvatarFallback>{shortName(q.patient.name)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{q.patient.name}</CardTitle>
                </div>
                <CardContent className="p-0">
                  <p className="text-sm text-gray-600 line-clamp-3">{q.question}</p>
                </CardContent>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center p-4 gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          size="icon"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          size="icon"
          variant="outline"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Toaster />
    </div>
  )
}