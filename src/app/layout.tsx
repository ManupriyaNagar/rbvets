import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediZen",
  description: "Advanced Medical Services",
  icons: {
    icon: "/vv.png",
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${funnelDisplay.variable} antialiased bg-[#9444A1] text-[#e9daea] font-sans`}
      >
        <main className="min-h-screen">
          <Header />
          {children}
          <Footer />
        </main>

      </body>
    </html>
  );
}
