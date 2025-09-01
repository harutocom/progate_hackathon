"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
type Task = {
  id: string;
  text: string;
  done: boolean;
};

type BingoCard = {
  id: string;
  createdAt: Date;
  tasks: Task[];
};
export default function BingoCreatePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [card, setCard] = useState<BingoCard | null>(null);
  const [bingoAchieved, setBingoAchieved] = useState(false);
  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch(`/api/bingocard/${params.id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setCard(data);
    };
    fetchCard();
  }, [params.id]);

  const generateCard = async () => {
    const res = await fetch("/api/bingocard", {
      method: "POST",
      credentials: "include",
    });
   const data = await res.json();
    // 新しいカードを作ったらそのページに飛ばす
    router.push(`/bingo/${data.id}`);
  };

  const toggleTask = async(taskId: string) => {
    if (!card) return;
    /*
    await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ iscompleted: true }),
    credentials: "include",
  });*/
    const newTasks = card.tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setCard({ ...card, tasks: newTasks });
  };

  const checkBingo = (tasks: Task[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return lines.some((line) => line.every((i) => tasks[i].done));
  };

  useEffect(() => {
  if (card && checkBingo(card.tasks) && !bingoAchieved) {
    setBingoAchieved(true);
    fetch(`/api/bingocard/${card.id}`, {
      method: "PATCH",
      credentials: "include",
    });
  }
}, [card,bingoAchieved]);
  return (
    <div className="w-full h-[130vh] py-5 mx-auto bg-[#fffde7] mt-[65px]">
      <div className=" pt-5 items-center relative z-0 w-full max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-4">
          夏休みToDoビンゴ
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 text-lg">
          夏休みの思い出をビンゴで彩ろう！
        </p>
      </div>

      <div className="pt-3 flex flex-col items-center justify-center">
        {!card || bingoAchieved ? (
          <Button
            className="bg-[#0D80F2] text-white w-[480px] h-[48px] rounded-[8px] hover:bg-[#0D80F2]/90"
            onClick={generateCard}
          >
            新しいビンゴカードを生成
          </Button>
        ) : null}
        {bingoAchieved && (
          <p className="text-3xl font-bold text-[#FFD700] mt-4">🎉 ビンゴ 🎉</p>
        )}
      </div>

      {card && (
        <div className="grid grid-cols-3 grid-rows-3 mt-8 w-[500px] h-[500px] justify-center items-center mx-auto">
          {card.tasks.map((task, index) => {
            let borderRadiusStyle = {};
            if (index === 0)
              borderRadiusStyle = { borderTopLeftRadius: "12px" };
            if (index === 2)
              borderRadiusStyle = { borderTopRightRadius: "12px" };
            if (index === 6)
              borderRadiusStyle = { borderBottomLeftRadius: "12px" };
            if (index === 8)
              borderRadiusStyle = { borderBottomRightRadius: "12px" };

            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`bingo-cell flex items-center justify-center border text-center cursor-pointer${
                  task.done ? " marked" : ""
                }`}
                style={{
                  width: "150px",
                  height: "150px",
                  padding: "0",
                  margin: "0",
                  ...borderRadiusStyle,
                }}
              >
                {task.text}
              </div>
            );
          })}
        </div>
      )}
      <style jsx>{`
        .bingo-cell {
          border: 2px dashed #81d4fa;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          aspect-ratio: 1 / 1;
          position: relative;
          overflow: hidden;
        }
        .bingo-cell:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .bingo-cell.marked {
          background-color: #fb8c00;
          font-weight: bold;
        }
        .bingo-cell.marked::after {
          content: "✓";
          font-size: 3rem;
          position: absolute;
          color: rgba(255, 255, 255, 0.5);
          transform: rotate(15deg);
        }
      `}</style>
    </div>
  );
}
