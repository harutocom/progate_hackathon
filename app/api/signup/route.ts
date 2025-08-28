// app/api/signup/route.ts

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // バリデーション
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "必須項目が不足しています" },
        { status: 400 }
      );
    }

    // ユーザー名・メールアドレスの重複チェック
    const { rows: existingUsers } = await query(
      'SELECT * FROM "user" WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "そのユーザー名またはメールアドレスは既に使用されています" },
        { status: 409 }
      );
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 新規ユーザーをデータベースに登録
    const { rows: newUser } = await query(
      'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "ユーザー登録に失敗しました" },
      { status: 500 }
    );
  }
}
