import { useLocale } from 'next-intl'
import BlurFade from "@/components/ui/blur-fade"
import TopNavBar from "@/components/TopNavBar"
import SideNavBar from "@/components/SideNavBar"



const navItems = [
  { href: `/admin`, icon: 'Home', label: "Home" },
  { href: `/admin/patients`, icon: 'User', label: "Patients" },
  { href: `/admin/doctors`, icon: 'UserCog', label: "Doctors" },
  { href: `/admin/labs`, icon: 'FlaskConical', label: "Labs" },
  { href: `/admin/pharmacies`, icon: 'Pill', label: "Pharmacies" },
  { href: `/admin/medicines`, icon: 'Tablets', label: "Medicines" },
  { href: `/admin/tests`, icon: 'TestTubeDiagonal', label: "Tests" },
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
        <BlurFade delay={0} className="mt-1 grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" inView>
          <SideNavBar navItems={navItems} role={"doctor"} />
          <div className="flex flex-col">
            <TopNavBar navItems={navItems}/>
            {children}
          </div>
        </BlurFade>
      </body>
    </html>
  )
}