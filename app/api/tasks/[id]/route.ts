import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
export async function PATCH(
    request: NextRequest,{ params }: { params: { id: string } }
) {
     const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.id !== params.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
       await query(
    `UPDATE tasks SET iscompleted=$1 WHERE id=$2`,
    [iscompleted, params.id]
  );

  return NextResponse.json({ success: true });
}
