import { FadeText } from "@/components/ui/fade-text";

interface IProps {
  name: string
}

export async function WelcomeUser({name=''}:IProps) {

  return (
 

      <FadeText
      className="text-xs md:text-lg font-bold text-black dark:text-white"
      direction="left"
      framerProps={{
        show: { transition: { delay: 0 } },
      }}
      text={<>Welcome, Dr.  {name.split(' ')[0]} <span className="hidden md:inline">{name.split(' ')[1]}</span></>}
    />
    

  );
}
