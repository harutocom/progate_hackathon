"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="mt-[52px] min-h-screen bg-white">
      <div className="mt-[200px] flex flex-col gap-8 items-center">
        <h1 className="text-[28px] text-black font-bold">
          Log In to your account
        </h1>
        <div className="">
          <Input
            type="username"
            placeholder="Username"
            className="h-[56px] bg-[#E8EDF5]"
          />
        </div>
        <div className="">
          <Input
            type="password"
            placeholder="Password"
            className="h-[56px] bg-[#E8EDF5]"
          />
        </div>
        <div className="">
          <Button className="w-[480px] h-[48px] rounded-md bg-[#0D80F2] text-white">
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
