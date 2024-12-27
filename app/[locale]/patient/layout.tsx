import { useLocale } from 'next-intl'
import BlurFade from "@/components/ui/blur-fade"
import Navbar from '@/components/patient/Navbar'
import Footer from '@/components/patient/Footer'



export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = useLocale()


  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <BlurFade delay={0}   className="flex flex-col min-h-screen "inView>
      <Navbar />
      
        {children}
        {/* <Banner />
        <SearchSection />
        <ExploreCards />
        <HealthServices /> */}
      <Footer />
        </BlurFade>
      </body>
    </html>
  )
}