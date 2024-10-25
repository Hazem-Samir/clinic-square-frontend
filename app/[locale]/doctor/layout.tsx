import BlurFade from "@/components/ui/blur-fade";
import TopNavBar from "@/components/TopNavBar";
import SideNavBar from "@/components/SideNavBar";
import { useTranslations } from 'next-intl'
export default function DoctorLayout({
      children, // will be a page or nested layout
    }: {
      children: React.ReactNode
    }) {
      
      const t = useTranslations('doctor')

      return (
        <html lang="en">
        <body>  
          
        <BlurFade delay={0} className="mt-1 grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" inView>
        {/* <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"> */}
    
          
    <SideNavBar />
    <div className="flex flex-col">
      <TopNavBar/>
      
      {children}
      </div>
      {/* </div> */}
                  </BlurFade>
                  </body>
                  </html>
      )
     
            
    
    }