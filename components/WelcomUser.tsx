import { Button } from "@/components/ui/button";
import { FadeText } from "@/components/ui/fade-text";
import { getUser } from "@/lib/auth";

interface IProps {
  name: string
}

export async function WelcomeUser({name=''}:IProps) {

  return (
 

      <FadeText
      className="text-xs md:text-l font-bold text-black dark:text-white"
      direction="left"
      framerProps={{
        show: { transition: { delay: 0 } },
      }}
      text={<>Welcome, {name.split(' ')[0]} <span className="hidden md:inline">{name.split(' ')[1]}</span></>}
    />
    

  );
}
