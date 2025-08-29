"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/profile");
    } else {
      alert("ログインに失敗しました。もう一度お試しください。");
      console.error("ログイン失敗...");
    }
  };
  return (
    <div className="mt-[52px] min-h-screen bg-white">
      <div className="mt-[200px] flex flex-col gap-8 items-center">
        <h1 className="text-[28px] text-black font-bold">
          Log In to your account
        </h1>
        <form
          action=""
          className="flex flex-col gap-8 items-center"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            placeholder="Username"
            className="h-[56px] bg-[#E8EDF5]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="h-[56px] bg-[#E8EDF5]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-[480px] h-[48px] rounded-md bg-[#0D80F2] text-white">
            Log In
          </Button>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a href="/setup" className="text-blue-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
