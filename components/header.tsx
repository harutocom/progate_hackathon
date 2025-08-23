import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 h-[65px] flex items-center justify-between bg-white border-b">
      <div className="ml-[32px] flex gap-[16px]">
        <Image src="/icon.svg" alt="Progate Logo" width={16} height={16} />
        <p className="font-Plus Jakarta Sans">夏のビンゴ </p>
      </div>
      <Button className="mr-[32px]" variant="ghost" size="icon">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Button>
    </header>
  );
}
