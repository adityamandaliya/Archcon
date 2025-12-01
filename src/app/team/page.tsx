import { Metadata } from "next";
import Team from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "Our Team - Archcon | Expert Professionals",
  description:
    "Meet the talented team of architects, engineers, and consultants behind Archcon's success. Our experts are dedicated to transforming Mumbai's skyline.",
  keywords:
    "Archcon team, architects, engineers, consultants, construction experts, Mumbai",
  openGraph: {
    title: "Meet the Archcon Team",
    description:
      "Discover the experts behind Archcon's premium construction and redevelopment services.",
    type: "website",
  },
};

export default function TeamPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Team />
    </main>
  );
}
