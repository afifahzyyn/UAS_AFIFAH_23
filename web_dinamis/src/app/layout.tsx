import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SiteLayout from "@/components/SiteLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Kopi Nusantara | Authentic Indonesian Coffee Shop",
  description: "Nikmati cita rasa kopi asli Nusantara. Dari biji pilihan terbaik Indonesia, diseduh dengan penuh cinta untuk menemani hari Anda.",
  keywords: ["kopi", "coffee shop", "kopi nusantara", "cafe", "kedai kopi", "arabika", "robusta"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
