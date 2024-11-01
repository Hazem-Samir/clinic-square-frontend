"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { shortName } from '@/lib/utils';
import {useState} from 'react';
import QuestionDetail from './QuestionDetail';
import { Button } from '../ui/button';
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


export default function QuestionsList({ questions  }: IProps) {
  const [step,setStep]=useState<number>(1);
  const [viewedQuestion,setViewedQuestion]=useState({});
  const handleViewQuestion=(question)=>{
    setViewedQuestion(question);
    setStep(2);
  }
  return (
    step===1?(
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Patient Questions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((q) => (
          // <Link href={`/doctor/medical-questions/${q.id}`} key={q.id} className="block h-full">
            <Button key={q.id} onClick={()=>{handleViewQuestion(q)}} className="block h-full" variant="ghost">
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
            </Button>
          // </Link>
        ))}
      </div>
    </div>
    )
     :<QuestionDetail question={viewedQuestion}/>
  )
}