import Hero from "@/components/sections/Hero";
import ProjectMap from "@/components/sections/ProjectMap";
import CorporateIdentity from "@/components/sections/CorporateIdentity";
import MotionStatement from "@/components/sections/MotionStatement";
import InfiniteScrollBar from "@/components/sections/InfiniteScrollBar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <MotionStatement />
      <InfiniteScrollBar />
      <ProjectMap />
      <CorporateIdentity />
    </main>
  );
}
