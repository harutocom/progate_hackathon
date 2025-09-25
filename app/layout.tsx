import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://progate-hackathon-delta.vercel.app/";

export const metadata: Metadata = {
  title: "夏休みToDoビンゴ",
  description: "夏休みの暇つぶしアプリ。",
  openGraph: {
    title: "夏休みToDoビンゴ",
    description: "夏休みの暇つぶしアプリ。",
    url: siteUrl,
    images: [
      {
        // NOTE: Ensure that 'og-image.png' exists in the 'public' directory at the project root.
        url: `${siteUrl}/og-image.png`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
