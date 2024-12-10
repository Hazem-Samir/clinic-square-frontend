'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { shortName } from '@/lib/utils'
import { getAge } from '@/utils/utils'
import { ArrowLeft, Edit } from 'lucide-react'
import Link from "next/link"
import { getUser } from '@/lib/auth'
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

import toast, { Toaster } from 'react-hot-toast'
import Spinner from '@/components/Spinner'
import { UpdateQuestion } from '@/lib/patient/clientApi'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  question: z.string().min(2,"Question is Required")
});

interface IProps {
  question: {
    id: string;
    patient: {
      name: string;
      profilePic: string;
      dateOfBirth: string;
      gender: string;
      id:string
    };
    question: string;
    answers: Array<{
      id: string;
      doctor: {
        id: string;
        name: string;
        profilePic: string;
      };
      answer: string;
    }>;
  }
}

export default function QuestionDetail({question}: IProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const user=getUser();
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
          question: "",
        },
  })
  const handleUpdateQuestion = async(data:z.infer < typeof formSchema >) => {
    // Here you would typically send the updated question to your backend
    console.log('Updated question:', data)
    setIsLoading(true);
    const res = await UpdateQuestion({question:data.question},question.id);
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
    setIsUpdateModalOpen(false)
    // You might want to update the local state or refetch the question data here
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/patient/medical-questions" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={question.patient.profilePic} alt={question.patient.name} />
            <AvatarFallback>{shortName(question.patient.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle>{question.patient.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Age: {getAge(question.patient.dateOfBirth)} | Gender: {question.patient.gender}</p>
          </div>
     {user.id===question.patient.id? 
         <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
         <DialogTrigger asChild>
           <Button variant="outline" size="sm">
             <Edit className="w-4 h-4 mr-2" />
             Update Question
           </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
           <DialogHeader>
             <DialogTitle>Update Question</DialogTitle>
             <DialogDescription>
              
             </DialogDescription>
           </DialogHeader>
           <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateQuestion)} className="space-y-8 max-w-3xl mx-auto ">
        
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input 
                placeholder="Enter Your New Question"
                disabled={isLoading}
                type=""
                {...field} />
              </FormControl>
              <FormDescription> Make changes to your question here. Click save when you're done.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>{isLoading?<Spinner/>:"Submit"}</Button>
      </form>
    </Form>
         </DialogContent>
       </Dialog>:null 
    }
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Question:</h2>
          <p className="mb-4">{question.question}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Answers:</h2>
      {question.answers.length > 0 ? question.answers.map((answer) => (
        <Card key={answer.id} className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={answer.doctor.profilePic} alt={answer.doctor.name} />
                <AvatarFallback>{shortName(answer.doctor.name)}</AvatarFallback>
              </Avatar>
              <CardTitle>{answer.doctor.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>{answer.answer}</p>
          </CardContent>
        </Card>
      )) : <p>No Answers Yet</p>}
      <Toaster />
    </div>
  )
}