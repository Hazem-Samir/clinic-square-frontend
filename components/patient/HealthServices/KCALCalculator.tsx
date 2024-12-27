"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus } from 'lucide-react'

export default function KCALCalculator() {
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState("male")
  const [activityLevel, setActivityLevel] = useState(1.2)
  const [calories, setCalories] = useState<number | null>(null)

  const calculateCalories = () => {
    let bmr
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }
    setCalories(Math.round(bmr * activityLevel))
  }

  const adjustValue = (type: 'weight' | 'height' | 'age', increment: boolean) => {
    const step = type === 'height' ? 1 : 1
    const setValue = type === 'weight' ? setWeight : type === 'height' ? setHeight : setAge
    const currentValue = type === 'weight' ? weight : type === 'height' ? height : age
    setValue(currentValue + (increment ? step : -step))
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 md:p-8">
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Calorie Calculator"
              width={400}
              height={200}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-2 text-center">Calorie Calculator</h1>
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 rounded-full bg-teal-500" />
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2" />
            </div>
          </div>

          {calories ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-teal-500 mb-2">{calories}</p>
                <p className="text-xl">Calories per day</p>
              </div>

              <Card className="w-full">
                <CardContent className="p-4 space-y-2">
                  <p className="text-center text-gray-600">
                    This is the estimated number of calories you need to maintain your current weight based on your BMR (Basal Metabolic Rate) and activity level.
                  </p>
                </CardContent>
              </Card>

              <Button 
                onClick={() => setCalories(null)} 
                variant="outline"
                className="w-full"
              >
                Calculate Again
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className=" p-4 rounded-lg">
                  <Label className="text-sm text-gray-500">WEIGHT (kg)</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-bold">{weight}</span>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => adjustValue('weight', false)}
                        className="h-8 w-8 rounded-full bg-orange-400 text-white hover:bg-orange-500"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => adjustValue('weight', true)}
                        className="h-8 w-8 rounded-full bg-teal-500 text-white hover:bg-teal-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className=" p-4 rounded-lg">
                  <Label className="text-sm text-gray-500">AGE</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-bold">{age}</span>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => adjustValue('age', false)}
                        className="h-8 w-8 rounded-full bg-orange-400 text-white hover:bg-orange-500"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => adjustValue('age', true)}
                        className="h-8 w-8 rounded-full bg-teal-500 text-white hover:bg-teal-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" p-4 rounded-lg">
                <Label className="text-sm text-gray-500">HEIGHT (cm)</Label>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-bold">{height}</span>
                  <input
                    type="range"
                    min="140"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-1/2 accent-teal-500"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500">GENDER</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm text-gray-500">ACTIVITY LEVEL</Label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
                  className="w-full mt-2 p-2 border rounded-md"
                >
                  <option value={1.2}>Sedentary</option>
                  <option value={1.375}>Lightly Active</option>
                  <option value={1.55}>Moderately Active</option>
                  <option value={1.725}>Very Active</option>
                  <option value={1.9}>Extra Active</option>
                </select>
              </div>

              <Button 
                onClick={calculateCalories}
                className="w-full bg-teal-500 hover:bg-teal-600"
              >
                Calculate Calories
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}