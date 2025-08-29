"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type BingoCheckResponse = {
  ongoing: boolean;
  bingoId?: string;
};

export default function BingoPage() {
  const [ongoing, setOngoing] = useState<boolean>(false);
  const [bingoId, setBingoId] = useState<string | null>(null);

  useEffect(() => {
    const checkOngoing = async () => {
      const res = await fetch("/api/bingocard/ongoing", {
        method: "GET",
        credentials: "include",
      });
      const data: BingoCheckResponse = await res.json();
      if (data.ongoing) {
        setOngoing(true);
        setBingoId(data.bingoId || null);
      }
    };
    checkOngoing();
  }, []);

  const handleCreateBingoCard = async () => {
    const res = await fetch("/api/bingocard", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    // 新しいカードを作ったらそのページに飛ばす
    window.location.href = `/bingo/${data.id}`;
  };

  return (
    <div className="w-[max] max-w-[max] h-[130vh] py-5 mx-auto bg-[#fffde7]">
      <div className="w-full h-[221px] pt-5 flex items-center justify-center">
        <p className="font-[manrope] font-bold text-[28px] leading-[35px] text-center">
          ビンゴカードをはじめる
        </p>
      </div>

      <div className="w-full h-[184px] pt-3 flex items-center justify-center">
        {!ongoing ? (
          <button
            onClick={handleCreateBingoCard}
            className="bg-[#0D80F2] text-white w-[480px] h-[48px] rounded-[8px] px-[20px] hover:bg-[#0D80F2]/90 cursor-pointer"
          >
            新しいビンゴカードを生成
          </button>
        ) : (
          <Link href={`/bingo/${bingoId}`}>
            <button className="bg-[#0D80F2] text-white w-[480px] h-[48px] rounded-[8px] px-[20px] hover:bg-[#0D80F2]/90 cursor-pointer">
              続きからプレイ
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
