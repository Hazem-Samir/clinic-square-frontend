import BlurFade from "@/components/ui/blur-fade";
import TopNavBar from "@/components/TopNavBar";
import SideNavBar from "@/components/SideNavBar";

export default function AuthLayout({
      children, // will be a page or nested layout
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang="en">
        <body>  
        <BlurFade delay={0} className="flex min-h-screen w-full" inView>
        {/* <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"> */}
    
       
      
      {children}
    
                  </BlurFade>
                  </body>
                  </html>
      )
     
            
    
    }