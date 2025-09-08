"use client";
import React, { useState } from "react";
import Link from "next/link";

type BingoCard = {
  id: string;
  createdAt: Date;
};

export default function BingoPage() {
  const [card] = useState<BingoCard | null>(null);

  return (
    <div className="w-[max] max-w-[max] h-[130vh] py-5 mx-auto  bg-[#fffde7]">
      <div className="w-full h-[221px] pt-5 flex items-center justify-center">
        <p className="font-[manrope] font-bold text-[28px] leading-[35px] text-center">
          ビンゴカードをはじめる
        </p>
      </div>

      <div className="w-full h-[184px] pt-3 flex items-center justify-center">
        {!card ? (
          <Link href="/bingo/create">
            <button className="bg-[#0D80F2] text-white w-[480px] h-[48px] rounded-[8px] px-[20px] hover:bg-[#0D80F2]/90 cursor-pointer">
              新しいビンゴカードを生成
            </button>
          </Link>
        ) : (
          <Link href="/bingo/create">
            <button className="bg-[#0D80F2] text-white w-[480px] h-[48px] rounded-[8px] px-[20px] hover:bg-[#0D80F2]/90 cursor-pointer">
              続きからプレイ
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
