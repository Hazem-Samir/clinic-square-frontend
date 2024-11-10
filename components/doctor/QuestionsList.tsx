"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { shortName } from '@/lib/utils';
import {useState} from 'react';
import { Button } from '../ui/button';
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

interface IProps {
  questions: Question[];
  currentPage: number;
  totalPages: number;
}

interface Question {
  id: number;
  patientName: string;
  profilePic: string;
  question: string;
}


export default function QuestionsList({ questions,currentPage,totalPages  }: IProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    router.push(`medical-questions?page=${newPage}`);
    setIsLoading(false);
  };

  return (
   
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Patient Questions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((q) => (
          <Link disabled={isLoading} href={`/doctor/medical-questions/${q.id}`} key={q.id} className="block h-full hover:drop-shadow-2xl">
             {/* <Button key={q.id} onClick={()=>{handleViewQuestion(q)}} className="block h-full" variant="ghost"> */}
            <Card  className="hover:shadow-md transition-shadow h-full flex flex-col">
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
            {/* </Button> */}
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
    </div>
    
    )
   
}