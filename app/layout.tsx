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
 export const metadata: Metadata = {
  title: "SOLARIS SKIN | เซรั่มกันแดดทาตัว ปกป้องสูงสุด ซึมไว ไม่เหนียว",
  description: "ครีมกันแดดทาตัวสูตรบางเบา SPF50+ PA++++ ปกป้องผิวจากแสงแดด บำรุงผิวกระจ่างใส ไม่ติดขน ไม่ทิ้งคราบขาว",
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
