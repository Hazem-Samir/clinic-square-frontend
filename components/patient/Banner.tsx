import Link from "next/link"
import Image from "next/image"
import BannerImage from "@/public/ExploreDoctor.jpg"

export default function Banner() {
  return (
    <section className="relative h-80 overflow-hidden rounded-lg">
      <div className="absolute inset-0">
        <Image
          src={BannerImage}
          alt="Explore Doctors"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-5xl font-bold text-white mb-6">Find Your Perfect Doctor</h1>
        <Link 
          href="/patient/our-doctors"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-teal-400/30 hover:bg-teal-400/40 rounded-md backdrop-blur-sm transition-colors"
        >
          Explore All Doctors
        </Link>
      </div>
    </section>
  )
}
