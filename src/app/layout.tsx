import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const saira = localFont({
  src: "../../public/fonts/Saira-VariableFont.ttf",
  variable: "--font-saira",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RB Vetcare",
  description: "Advanced Medical Services",
  icons: {
    icon: "/vv.png",
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PawCursor from "@/components/PawCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${saira.variable} antialiased bg-[#9444A1] text-[#e9daea] font-sans`}
      >
        <PawCursor />
        <main className="min-h-screen">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
