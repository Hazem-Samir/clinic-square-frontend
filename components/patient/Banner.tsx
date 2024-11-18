import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Banner() {
  return (
    <section className="relative h-80 bg-gradient-to-r from-primary to-primary-dark rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Find Your Perfect Doctor</h1>
          <Link className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 rounded-md px-8" href="/patient/our-doctors">
            {/* <Button variant="secondary" size="lg" className="cursor-pointer"> */}
              Explore All Doctors
            {/* </Button> */}
          </Link>
        </div>
      </div>
    </section>
  )
}