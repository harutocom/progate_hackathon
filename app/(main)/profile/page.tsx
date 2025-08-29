import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProfilePageData } from "@/lib/data-fetcher";
import { ProfileMain } from "@/components/profile-main";
import { BingoCardList } from "@/components/bingo-card-list";
import BackButton from "@/components/backButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }
  const userId = Number(session.user.id);
  const { user, cards, tasks } = await getProfilePageData(userId);

  return (
    <div className="profile-container flex flex-col bg-[#E5E8EB] justify-center max-w-[1440px] mt-[65px]">
      <ProfileMain user={user} />
      <BingoCardList username={user.username} cards={cards} tasks={tasks} />

      <div className="flex items-center gap-2 flex-col mt-[100px]">
        <BackButton />
      </div>
    </div>
  );
}
