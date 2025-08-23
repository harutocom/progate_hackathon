"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
  return (
    <div className="mt-[52px] min-h-screen bg-white">
      <div className="mt-[200px] flex flex-col gap-8 items-center">
        <h1 className="text-[28px] text-black font-bold">
          Create your account
        </h1>
        <Input
          type="username"
          placeholder="Username"
          className="h-[56px] bg-[#E8EDF5]"
        />
        <Input
          type="email"
          placeholder="Email"
          className="h-[56px] bg-[#E8EDF5]"
        />
        <Input
          type="password"
          placeholder="Password"
          className="h-[56px] bg-[#E8EDF5]"
        />
        <Button className="w-[480px] h-[48px] rounded-md bg-[#0D80F2] text-[#F7FAFC]">
          Create Account
        </Button>
        <Button className="w-[480px] h-[48px] rounded-md bg-[#E8EDF5] text-[#0D141C]">
          Log In
        </Button>
      </div>
    </div>
  );
}
