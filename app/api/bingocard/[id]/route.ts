
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(
  { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.id !== params.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  const tasks = await query(`SELECT * FROM tasks WHERE bingocardsid=$1`, [
    params.id,
  ]);
  return NextResponse.json(tasks);
}
export async function PATCH( { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await query(
    `UPDATE bingocards SET status='completed' WHERE id=$1 AND userid=$2`,
    [params.id, session.id]
  );
}