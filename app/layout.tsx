import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA SUN | กันแดดผิวกายเนื้อบางเบา ปกป้องพร้อมบำรุง x2",
  description: "กันแดดทาตัวสูตรอ่อนโยน SPF50+ PA++++ แตกตัวเป็นน้ำ ซึมซาบไว ให้ผิวเนียนนุ่มกระจ่างใส ไม่เป็นคราบ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
