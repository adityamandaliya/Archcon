import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import HtmlWrapper from "@/components/layout/HtmlWrapper";
import Navbar from "@/components/layout/Navbar";
import LenisProvider from "@/components/layout/LenisProvider";

// Load Fonts (Existing Code)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Archcon | Mumbai Redevelopment",
  description: "Premier construction and redevelopment firm in Mumbai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HtmlWrapper>
      <LenisProvider>
        <Navbar />
        {children}
      </LenisProvider>
    </HtmlWrapper>
  );
}
