import Banner from "@/components/patient/Banner";
import ExploreCards from "@/components/patient/ExploreCards";
import HealthServices from "@/components/patient/HealthServices";
import MedicalQuestionCard from "@/components/patient/MedicalQuestionCard";
import SearchSection from "@/components/patient/SearchSection";
import ProtectedRoute from "@/components/ProtectedRoute";
import BlurFade from "@/components/ui/blur-fade";


export default function PatientPage() {
  
  return (
    <ProtectedRoute allowedRoles={['patient']}>  
      <BlurFade delay={0} className="flex-grow p-4 md:p-8 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full bg-background  text-foreground" inView>
    
      
       <Banner />
       <SearchSection />
       <ExploreCards />
       <MedicalQuestionCard />
       <HealthServices />
      </BlurFade>
    </ProtectedRoute>
  )
}