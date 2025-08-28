"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      className="w-[372px] h-[48px] bg-[#0D80F2] text-white hover:bg-[#0D80F2]/90 cursor-pointer"
      onClick={() => router.back()}
    >
      return page
    </Button>
  );
}
