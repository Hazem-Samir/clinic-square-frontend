import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ExploreCards() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <Card className="overflow-hidden bg-card">
        <div className="relative h-48">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Pharmacy"
            fill
            style={{objectFit: "cover"}}
          />
        </div>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Explore Pharmacies</h2>
          <p className="text-gray-600 mb-4">Find medications and health products</p>
          <Button>Go to Pharmacies</Button>
        </CardContent>
      </Card>
      <Card className="overflow-hidden bg-card">
        <div className="relative h-48">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Laboratory"
           fill
            style={{objectFit: "cover"}}
          />
        </div>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Explore Labs</h2>
          <p className="text-gray-600 mb-4">Book lab tests and view results</p>
          <Button>Go to Labs</Button>
        </CardContent>
      </Card>
    </section>
  )
}