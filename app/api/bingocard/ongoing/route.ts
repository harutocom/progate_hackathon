import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const result = await query(
    `SELECT id FROM bingocards WHERE userid=$1 AND status='ongoing' LIMIT 1`,
    [session.id]
  );
}


