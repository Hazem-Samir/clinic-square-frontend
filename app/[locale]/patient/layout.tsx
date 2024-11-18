import { useLocale } from 'next-intl'
import BlurFade from "@/components/ui/blur-fade"
import TopNavBar from "@/components/TopNavBar"
import SideNavBar from "@/components/SideNavBar"
import Navbar from '@/components/patient/Navbar'
import Footer from '@/components/patient/Footer'



const navItems = [
  { href: `/doctor`, icon: 'Home', label: "Home" },
  { href: `/doctor/reservations-history`, icon: 'History', label: "Reservations History" },
  { href: `/doctor/my-schedule`, icon: 'CalendarCheck', label: "My Schedule" },
  { href: `/doctor/medical-questions`, icon: 'MessageCircleQuestion', label: "Medical Questions" },
]
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