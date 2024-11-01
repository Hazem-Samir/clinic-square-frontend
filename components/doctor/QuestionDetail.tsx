'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { shortName } from '@/lib/utils'
import { getAge } from '@/utils/utils'

// Mock data for demonstration
const questionData = {
  id: 1,
  patientName: "John Doe",
  profilePic: "/placeholder.svg",
  question: "What are the side effects of medication X?",
  age: 35,
  gender: "Male",
  medicalHistory: "Hypertension, Diabetes",
  answers: [
    { id: 1, doctorName: "Dr. Smith", answer: "Common side effects include nausea and headache. If these persist, please consult your doctor.", timestamp: "2023-05-15T10:30:00Z" },
    { id: 2, doctorName: "Dr. Johnson", answer: "In addition to what Dr. Smith mentioned, some patients may experience dizziness. Stay hydrated and avoid operating heavy machinery until you know how the medication affects you.", timestamp: "2023-05-15T14:45:00Z" },
  ]
}

interface IProps {
  question:{}
}
export default function QuestionDetail({question}:IProps) {
  const [newAnswer, setNewAnswer] = useState("")
  const [answers, setAnswers] = useState(questionData.answers)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAnswer.trim()) {
      const newAnswerObj = {
        id: answers.length + 1,
        doctorName: "Dr. You", // This would typically come from the logged-in user's data
        answer: newAnswer,
        timestamp: new Date().toISOString(),
      }
      setAnswers([...answers, newAnswerObj])
      setNewAnswer("")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={question.patient.profilePic} alt={question.patient.name} />
            <AvatarFallback>{shortName(question.patient.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{question.patient.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Age: {getAge(question.patient.dateOfBirth)} | Gender: {question.patient.gender}</p>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Question:</h2>
          <p className="mb-4">{question.question}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Answers:</h2>
      {question.answers.map((answer) => (
        <Card key={answer.id} className="mb-4">
          <CardHeader>
            <CardTitle>{answer.doctorName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{answer.answer}</p>
          </CardContent>
        </Card>
      ))}

      <form onSubmit={handleSubmit} className="mt-6">
        <Textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here..."
          className="mb-4"
        />
        <Button type="submit">Submit Answer</Button>
      </form>
    </div>
  )
}