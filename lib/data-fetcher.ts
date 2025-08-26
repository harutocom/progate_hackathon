import { User, BingoCard, Task, TasksByCard } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const getProfilePageData = async (
  userId: number
): Promise<{ user: User; cards: BingoCard[]; tasks: TasksByCard }> => {
  const [userRes, cardsRes] = await Promise.all([
    fetch(`${API_BASE_URL}/api/users/${userId}`, { cache: "no-store" }),
    fetch(`${API_BASE_URL}/api/bingocards?userId=${userId}`, {
      cache: "no-store",
    }),
  ]);

  if (!userRes.ok) throw new Error("ユーザー情報の取得に失敗しました");
  if (!cardsRes.ok) throw new Error("ビンゴカードの取得に失敗しました");

  const user: User = await userRes.json();
  const cards: BingoCard[] = await cardsRes.json();

  if (cards.length === 0) {
    return { user, cards, tasks: {} };
  }

  const tasksPromises = cards.map((card) =>
    fetch(`${API_BASE_URL}/api/tasks?bingoCardId=${card.id}`, {
      cache: "no-store",
    }).then((res) => {
      if (!res.ok)
        throw new Error(`タスクの取得に失敗しました (カードID: ${card.id})`);
      return res.json();
    })
  );
  const tasksResults: Task[][] = await Promise.all(tasksPromises);

  const tasksByCard: TasksByCard = {};
  cards.forEach((card, index) => {
    tasksByCard[card.id] = tasksResults[index];
  });

  return { user, cards, tasks: tasksByCard };
};
