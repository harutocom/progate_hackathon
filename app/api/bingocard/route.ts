import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { query } from "@/lib/db";
import { authOptions } from " ../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "process.env.OPENROUTER_API_KEY",
});
async function GenerateTask() {
  const completion = await openai.chat.completions.create({
    model: "deepen/deepseek-v3.1-base",
    messages: [
      {
        role: "system",
        content:
          'あなたは意地悪なタスク生成アシスタントです。居酒屋でできる飲みゲーの罰ゲームの夏バージョンを10文字以内で9個生成して日本語でJSON配列（例: ["タスク1", "タスク2", ...]）で返してください。',
      },
    ],
  });

  const result = completion.choices[0]?.message?.content?.trim();
  let list: string[] = [];
  list = JSON.parse(result);
  return list;
}


export async function POST() {
  const session = await getServerSession(authOptions);
if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const task = await GenerateTask();
  const bingocardresult = await query(
    `
      INSERT INTO bingocards (date,userid,status) VALUES (NOW(),$1,ongoing)  
      RETURNING id`,
    [session.id]
  );
  const bingocardsid = bingocardresult.rows[0].id;
  const values = task
    .map((taskname, i) => [bingocardsid, taskname, i, false])
    .flat();
  const placeholders = task
    .map(
      (_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`
    )
    .join(",");
  await query(
    `
      INSERT INTO tasks (bingocardsid, taskname, iscompleted, islocated)
      VALUES ${placeholders}
    `,
    values
  );
}
