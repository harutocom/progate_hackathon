import { NextResponse,NextRequest } from "next/server";
import { query } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try{
    const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const result = await query(
    `SELECT id FROM bingocards WHERE userid=$1 AND status='ongoing' LIMIT 1`,
    [session.user.id]
  );
  if (result.rows.length>0){
    return NextResponse.json({ongoing:true,bingoId:result.rows[0].id},{status:200});

  }
  else{
    return NextResponse.json({ongoing:false},{status:200});
  }
}
  catch(error){
    console.error("GET /api/bingocard/ongoing error:", error);
    return NextResponse.json({ error: "Internal Server Error" },{ status: 500 });
  }
}


