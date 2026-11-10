import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/toast"

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Kindero",
  description: "Join and create community service events near you",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div>{children}</div></body>
        <Toaster />
    </html>
  );
}
