"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, X } from 'lucide-react'

const allSymptoms = [
  "Headache", "Fever", "Cough", "Fatigue", "Shortness of breath",
  "Nausea", "Dizziness", "Chest pain", "Abdominal pain", "Rash",
  "Sore throat", "Runny nose", "Muscle ache", "Joint pain", "Vomiting"
]

export default function SearchSection() {
  const [symptomFilter, setSymptomFilter] = useState('')
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

  const filteredSymptoms = allSymptoms.filter(symptom => 
    symptom.toLowerCase().includes(symptomFilter.toLowerCase())
  )

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== symptom))
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="bg-card shadow-xl rounded-3xl border border-border">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <Tabs defaultValue="name" className="w-full ">
            <TabsList className="grid w-full grid-cols-2 mb-4 p-0">
              <TabsTrigger value="name" className="text-xs  sm:text-sm md:text-base lg:text-lg h-full ">
                Search for Doctor
              </TabsTrigger>
              <TabsTrigger value="symptoms" className="text-xs sm:text-sm md:text-base lg:text-lg h-full">
                Search by Symptoms
              </TabsTrigger>
            </TabsList>
            <TabsContent value="name" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
                <Input 
                  placeholder="Enter doctor name, specialization, or city" 
                  className="flex-grow text-sm sm:text-base md:text-lg py-2 sm:py-4 md:py-6"
                />
                <Button size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Search
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="symptoms" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
                <Input
                  placeholder="Filter symptoms"
                  value={symptomFilter}
                  onChange={(e) => setSymptomFilter(e.target.value)}
                  className="text-sm sm:text-base md:text-lg py-2 sm:py-4 md:py-6"
                />
                <Button className="w-full sm:w-auto">
                  <Search className="mr-2 h-4 w-4" /> Search by Symptoms
                </Button>
              </div>
              {selectedSymptoms.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedSymptoms.map((symptom) => (
                    <Badge key={symptom} variant="secondary" className="px-2 py-1 text-xs sm:text-sm">
                      {symptom}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0"
                        onClick={() => removeSymptom(symptom)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {symptom}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 max-h-60 overflow-y-auto">
                {filteredSymptoms.map((symptom, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`justify-center px-2 sm:px-4 py-1 sm:py-2 h-auto text-xs sm:text-sm md:text-base font-medium rounded-full ${
                      selectedSymptoms.includes(symptom) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}