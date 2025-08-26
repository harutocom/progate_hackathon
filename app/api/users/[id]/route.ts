import { NextResponse } from "next/server";

//ダミーデータ
const users = [
  {
    id: 1,
    username: "山田太郎",
    email: "yamada@example.com",
    profileImg: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    username: "鈴木花子",
    email: "suzuki@example.com",
    profileImg: "https://github.com/shadcn.png",
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
