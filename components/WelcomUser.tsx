import { Button } from "@/components/ui/button";
import { FadeText } from "@/components/ui/fade-text";

export async function WelcomeUser() {
  return (
 

      <FadeText
      className="text-l font-bold text-black dark:text-white"
      direction="left"
      framerProps={{
        show: { transition: { delay: 0 } },
      }}
      text={`Welcome, Dr.Ahmed`}
    />
    

  );
}
