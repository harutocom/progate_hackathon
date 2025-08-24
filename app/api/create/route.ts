import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "<OPENROUTER_API_KEY>",
});
async function GenerateTask() {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-v3.1-base",
    messages: [
      {
        role: "system",
        content:
          'あなたは意地悪なタスク生成アシスタントです。夏休みにできる恥ずかしいようなタスクを9個生成して日本語でJSON配列（例: ["タスク1", "タスク2", ...]）で返してください。',
      },
    ],
  });

  const result = completion.choices[0]?.message?.content?.trim();
  let list: string[] = [];
  list = JSON.parse(result);
  return list;
}
export async function POST() {
  const task = await GenerateTask();
  return task;
}
