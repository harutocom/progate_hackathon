"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert("登録が成功しました！ログインページに移動します。");
      router.push("/login");
      console.log("登録成功！");
    } else {
      alert("登録に失敗しました。もう一度お試しください。");
      console.error("登録失敗...");
    }
  };

  return (
    <div className="mt-[52px] min-h-screen bg-white">
      <div className="mt-[200px] flex flex-col gap-8 items-center">
        <h1 className="text-[28px] text-black font-bold">
          Create your account
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
            type="email"
            placeholder="Email"
            className="h-[56px] bg-[#E8EDF5]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="h-[56px] bg-[#E8EDF5]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-[480px] h-[48px] rounded-md bg-[#0D80F2] text-[#F7FAFC]">
            Create Account
          </Button>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
