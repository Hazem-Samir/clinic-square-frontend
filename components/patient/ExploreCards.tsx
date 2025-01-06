import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import ExplorePharmacies from "@/public/ExplorePharmacies.jpg"
import ExploreLabs from "@/public/ExploreLabs.png"

export default function ExploreCards() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <Card className="overflow-hidden bg-card">
        <div className="relative h-48">
          <Image
            src={ExplorePharmacies}
            alt="Pharmacy"
            fill
            style={{objectFit: "cover"}}
          />
        </div>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Explore Pharmacies</h2>
          <p className="text-gray-600 mb-4">Find medications and health products</p>
          <Link href="/patient/pharmacies" className="
          inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-teal-400 text-primary-foreground hover:bg-teal-400/90">Go to Pharmacies</Link>
        </CardContent>
      </Card>
      <Card className="overflow-hidden bg-card">
        <div className="relative h-48">
          <Image
            src={ExploreLabs}
            alt="Laboratory"
           fill
            style={{objectFit: "cover"}}
          />
        </div>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Explore Labs</h2>
          <p className="text-gray-600 mb-4">Book lab tests and view results</p>
          <Link href="/patient/labs" className="
          inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-teal-400 text-primary-foreground hover:bg-teal-400/90">Go to Labs</Link>

        </CardContent>
      </Card>
    </section>
  )
}