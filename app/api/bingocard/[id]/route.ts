
import { NextResponse ,NextRequest} from "next/server";
import { query } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try{    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {id} =await params;
    const cardID=parseInt(id,10);
    if (isNaN(cardID)){
      return NextResponse.json({error:"Invalid ID format"},{status:400});}
      const cardResult=await query(
        `SELECT id,date FROM bingocards WHERE id=$1`,
        [cardID]
      );
      const cardData =cardResult.rows[0];
      if (!cardData){
        return NextResponse.json({error:"Card not found"},{status:404});
      }


  const tasksResult = await query(`SELECT id,taskname AS text,iscompleted AS done  FROM tasks WHERE bingocardsid=$1 ORDER BY islocated ASC`, [cardID]);
  const responseData={
    id:cardData.id.toString(),
    date:cardData.date,
    tasks:tasksResult.rows,
  };

  return NextResponse.json(responseData);
  } catch (error) {
    console.error("GET /api/bingocard/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request:NextRequest ,{ params }: { params:Promise< { id: string }>}) {
try{
const session = await getServerSession(authOptions);
if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const {id}=await params;
    await query(
    `UPDATE bingocards SET status='completed' WHERE id=$1 AND userid=$2`,
    [id, session.user.id]
  );
  return NextResponse.json({ success: true });
} catch (error) {
    console.error("PATCH /api/bingocard/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}