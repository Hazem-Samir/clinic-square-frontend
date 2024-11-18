import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, Syringe, Baby, Activity } from 'lucide-react'

const services = [
  { title: "BMI Calculator", icon: <Calculator className="h-12 w-12" />, href: "/patient/health-services/bmi-calculator" },
  { title: "Period Calculator", icon: <Syringe className="h-12 w-12" />, href: "/patient/health-services/period-calculator" },
  { title: "Pregnancy Calculator", icon: <Baby className="h-12 w-12" />, href: "/patient/health-services/pregnancy-calculator" },
  { title: "Calorie Counter", icon: <Activity className="h-12 w-12" />, href: "/patient/health-services/kcal-calculator" },
]

export default function HealthServices() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Health Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Link key={index} href={service.href} className="block group">
            <Card className="transition-shadow hover:shadow-md rounded-2xl h-full bg-card">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="text-primary group-hover:text-primary-dark transition-colors">
                  {service.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}