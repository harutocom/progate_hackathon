"use client";
import React, { useState } from "react";
import Link from "next/link";

type BingoCard = {
  id: string;
  createdAt: Date;
};

export default function BingoPage() {
  const [card, setCard] = useState<BingoCard | null>(null);

  return (
    <div className="w-[960px] max-w-[960px] h-[669px] py-5 mx-auto">
      <div className="w-full h-[221px] pt-5 flex items-center justify-center">
        <p className="text-center text-lg font-medium">
          ビンゴカードをはじめる
        </p>
      </div>

      <div className="w-full h-[184px] pt-3 flex items-center justify-center">
        {!card ? (
          <Link href="/bingo/create">
            <button className="bg-[#0D80F2] text-white w-[480px] h-[48px] rounded-[8px] px-[20px] hover:bg-[#0D80F2]/90">
              新しいビンゴカードを生成
            </button>
          </Link>
        ) : (
          <Link href="/bingo/create">
            <button className="bg-[#0D80F2] text-white w-[480px] h-[48px] rounded-[8px] px-[20px] hover:bg-[#0D80F2]/90">
              続きからプレイ
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
