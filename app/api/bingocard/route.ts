import { NextResponse } from "next/server";
import OpenAI from "openai";
import { query } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});
async function GenerateTask() {
  try{
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3.1:free",
    messages: [
      {
        role: "system",
        content:
          'あなたは意地悪なタスク生成アシスタントです。居酒屋でできる飲みゲーの罰ゲームの夏バージョンを10文字以内で9個生成して日本語でJSON配列（例: ["タスク1", "タスク2", ...]）で返してください。説明、指示、メタ解説は出力しません。生成されたJSON配列のみを出力します。',
      },
    ],
  });

  const result = completion.choices[0]?.message?.content?.trim();
  if (!result) {
    throw new Error("No response from OpenAI");
  }
  const match = result.match(/\[[^\]]+\]/);
  console.log(JSON.parse(match[0]));
  return JSON.parse(match[0]);
}catch(error){
console.error("OpenAPI orJSON parsing error:", error);
throw new Error("タスクの生成に失敗しました");
}
}


export async function POST() {
  try{const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
  const tasks = await GenerateTask();
  const bingocardresult = await query(
    `INSERT INTO bingocards (date,userid,status) 
      VALUES (NOW(),$1,'ongoing')  
      RETURNING id`,
    [session.user.id]
  );
  const bingocardsid = bingocardresult.rows[0].id;

  const values = tasks
    .map(
      (taskname:string, i:number) => [bingocardsid, taskname,false,i])
    .flat();
  const placeholders = tasks
    .map(
      (_taskname:string, i:number) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`
    )
    .join(",");
    await query(
    `
      INSERT INTO tasks (bingocardsid, taskname, iscompleted, islocated)
      VALUES ${placeholders}
    `,
    values
  );
  return NextResponse.json({id: bingocardsid }, { status: 200 });
}catch (error){
  console.error("POST /api/bingocard failed:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
  }

