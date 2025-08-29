import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bingoCardId = searchParams.get("bingoCardId");

  if (!bingoCardId) {
    return NextResponse.json(
      { error: "bingoCardId is required" },
      { status: 400 }
    );
  }

  try {
    const result = await query(
      "SELECT id, bingocardsid, taskname, iscompleted, islocated FROM tasks WHERE bingocardsid = $1",
      [parseInt(bingoCardId, 10)]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
