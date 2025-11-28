import Hero from "@/components/sections/Hero";
import ProjectMap from "@/components/sections/ProjectMap";
import CorporateIdentity from "@/components/sections/CorporateIdentity"; // New Import
import MotionStatement from "@/components/sections/MotionStatement";
import InfiniteScrollBar from "@/components/sections/InfiniteScrollBar";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <MotionStatement />
      <InfiniteScrollBar />
      <Projects />
      <ProjectMap />
      <CorporateIdentity />
    </main>
  );
}
