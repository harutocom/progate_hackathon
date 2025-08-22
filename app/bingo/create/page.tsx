"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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

const initialTasks = [
  "スイカ割りをする",
  "線香花火をする",
  "かき氷を食べる",
  "海に行く",
  "花火大会に行く",
  "プールで遊ぶ",
  "夏祭りに行く",
  "キャンプをする",
  "日焼け止めを塗る",
];

export default function BingoCreatePage() {
  const [card, setCard] = useState<BingoCard | null>(null);
  const [bingoAchieved, setBingoAchieved] = useState(false);

  const generateCard = () => {
    const tasks: Task[] = initialTasks
      .sort(() => Math.random() - 0.5)
      .slice(0, 9)
      .map((text, index) => ({
        id: `${index}`,
        text,
        done: false,
      }));

    setCard({
      id: Date.now().toString(),
      createdAt: new Date(),
      tasks,
    });
    setBingoAchieved(false);
  };

  const toggleTask = (taskId: string) => {
    if (!card) return;
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

  // タスクが変わるたびにビンゴ判定
  useEffect(() => {
    if (card) {
      const bingo = checkBingo(card.tasks);
      setBingoAchieved(bingo);
    }
  }, [card]);

  return (
    <div className="w-[960px] max-w-[960px] h-[669px] py-5 mx-auto">
      {/* タイトル */}
      <div className="w-full h-[221px] pt-5 flex items-center justify-center">
        <p className="font-manrope font-bold text-[28px] leading-[35px] text-center">
          ビンゴカードを生成・プレイ
        </p>
      </div>

      {/* ボタン */}
      <div className="w-full h-[184px] pt-3 flex flex-col items-center justify-center">
        {!card || bingoAchieved ? (
          <Button
            className="bg-[#0D80F2] text-white w-[480px] h-[48px] rounded-[8px] hover:bg-[#0D80F2]/90"
            onClick={generateCard}
          >
            新しいビンゴカードを生成
          </Button>
        ) : null}

        {/* ビンゴ達成時の表示（ボタンの下） */}
        {bingoAchieved && (
          <p className="text-3xl font-bold text-[#FFD700] mt-4">🎉 ビンゴ 🎉</p>
        )}
      </div>

      {/* ビンゴカード表示 */}
      {card && (
        <div
          className="grid grid-cols-3 grid-rows-3 mt-8 w-[928px] h-[218px] border rounded-[12px]"
          style={{ borderWidth: "1px" }}
        >
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
                className={`flex items-center justify-center border text-center cursor-pointer
                  ${task.done ? "bg-[#CFC7E5]" : "bg-white"}
                `}
                style={{
                  width: "312px",
                  height: "72px",
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
    </div>
  );
}
