import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function PATCH(
    request: NextRequest,{ params }: { params: Promise<{ id: string }> }
) {
     try{
      const session = await getServerSession(authOptions);
      if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const iscompleted:boolean=body.iscompleted;
    if (typeof iscompleted !== "boolean") {
    return NextResponse.json({ error: "Invalid 'iscompleted' value" }, { status: 400 });
    }
    const{id :taskId}=await params;
    const userID=session.user.id;
    const result = await query(
    `UPDATE tasks t 
     SET iscompleted=$1 
     WHERE id=$2 
     AND t.bingocards bc.id
     AND bc.userid=$3`,
    [iscompleted, taskId,userID]
  );
  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}catch(error){
console.error("PATCH /api/tasks/[id] failed:", error);
return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
}

