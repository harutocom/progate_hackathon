import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { NextAuth } from "app/api/auth/[...nextauth]/route";

export async function GET() {
  const user = await NextAuth();
  if (!user) return NextResponse.json({ error: "認証エラー" }, { status: 401 });

  const result = await query(
    `SELECT id FROM bingocards WHERE userid=$1 AND status='ongoing' LIMIT 1`,
    [user.id]
  );

  if (result.length > 0) {
    return NextResponse.json({ ongoing: true, bingoId: result.row[0].id });
  } else {
    return NextResponse.json({ ongoing: false });
  }
}
