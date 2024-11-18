import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import {  MessageCircle } from "lucide-react"
import Link from "next/link"
interface IPrpos {

};

const MedicalQuestionCard =({}:IPrpos)=>{
      return(
            <Card className="mb-6">
            <CardHeader>
              <CardTitle>Have a Medical Question?</CardTitle>
              <CardDescription>Get answers from our qualified healthcare professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore our medical questions page to find answers to common health concerns or ask your own question.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/patient/medical-questions">
                <Button className="w-full sm:w-auto">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Explore Medical Questions
                </Button>
              </Link>
            </CardFooter>
          </Card>
      )
}

export default MedicalQuestionCard