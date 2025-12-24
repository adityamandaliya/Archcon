import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import HtmlWrapper from "@/components/layout/HtmlWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";

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
  icons: {
    icon: "/images/Logo/Archcon_logo_wt.png",
  },
};

import LoadingScreen from "@/components/layout/LoadingScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HtmlWrapper>
      <LenisProvider>
        <LoadingScreen />
        <Navbar />
        {children}
        <Footer />
      </LenisProvider>
    </HtmlWrapper>
  );
}
