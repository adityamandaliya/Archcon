"use client";

import { useSuppressHydrationWarning } from "@/hooks/useSuppressHydrationWarnings";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";

// Load Fonts (Duplicated here so the Client Component has access to the variables)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Define the component signature to accept children (the rest of your app)
export default function HtmlWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the hook inside the client component boundary
  const { suppressHydrationWarning } = useSuppressHydrationWarning();

  // The <html> and <body> tags must be rendered here, inside the Client component
  return (
    <html
      lang="en"
      // Apply suppression warning to the element where the external script injects code
      suppressHydrationWarning={suppressHydrationWarning}
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
