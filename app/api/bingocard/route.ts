import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { useParams } from "next/navigation";
import { query } from "@/lib/db";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "<OPENROUTER_API_KEY>",
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
export async function GET() {
    const params = useParams<{ id: string }>();
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "認証エラー" }, { status: 401 });
    const tasks = await query(`SELECT * FROM tasks WHERE bingocardsid=$1`, [params.id]);
    return NextResponse.json(tasks);}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "認証エラー" }, { status: 401 });
  }
  const task = await GenerateTask();
  const bingocardresult = await query(
    `
      INSERT INTO bingocards (date,userid,status) VALUES (NOW(),$!,ongoing)  
      RETURN id`,
    [user.id]
  );
  const values: any[] = [];
  const placeholders: string[] = [];
  const bingocardid = bingocardresult[0].id;
  task.forEach((task,i) => {
    values.push(bingocardid, task, i, false);
    placeholders.push(
    `($${values.length - 3}, $${values.length - 2}, $${values.length - 1}, $${
      values.length
    })`);
    await query(
    `
      INSERT INTO tasks (bingocardsid, taskname, iscompleted, islocated)
      VALUES ${placeholders.join(",")}
    `,
    values
  )};