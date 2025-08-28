// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        // DBからユーザーを検索
        const { rows } = await query(
          'SELECT * FROM "user" WHERE username = $1',
          [credentials.username]
        );
        const user = rows[0];

        if (!user) return null;

        // 入力されたパスワードとDBのハッシュ化されたパスワードを比較
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (isPasswordCorrect) {
          // 正しければユーザー情報を返す
          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // ★ この一行を追加
  },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };
