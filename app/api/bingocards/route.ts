import { NextRequest, NextResponse } from "next/server";

//ダミーデータ
const allBingoCards = [
  // ユーザーID: 1 のカード
  { id: 10, date: "2025-01-12", userid: 1 },
  { id: 11, date: "2025-02-01", userid: 1 },
  { id: 12, date: "2025-05-23", userid: 1 },
  // ユーザーID: 2 のカード
  { id: 12, date: "2025-03-15", userid: 2 },
  { id: 13, date: "2025-04-20", userid: 2 },
];

export async function GET(request: NextRequest) {
  // URLの?以降のパラメータを取得 (例: ?userId=1)
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  // userIdパラメータが指定されていない場合はエラーを返す
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  // 全カードの中から、指定されたuserIdを持つカードだけを絞り込む
  const userCards = allBingoCards.filter(
    (card) => card.userid === parseInt(userId, 10)
  );

  // 絞り込んだ結果をJSON形式で返す
  return NextResponse.json(userCards);
}
