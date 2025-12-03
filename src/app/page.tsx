import Hero from "@/components/sections/Hero";
import Redevelopment from "@/components/sections/Redevelopment";
import ProjectMap from "@/components/sections/ProjectMap";
import UpdatesSection from "@/components/sections/UpdatesSection";
import CorporateIdentity from "@/components/sections/CorporateIdentity";
import Contact from "@/components/sections/Contact";
import MotionStatement from "@/components/sections/MotionStatement";
import InfiniteScrollBar from "@/components/sections/InfiniteScrollBar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Redevelopment />
      <MotionStatement />
      <InfiniteScrollBar />
      <ProjectMap />
      {/* <UpdatesSection /> */}
      <CorporateIdentity />
      <Contact />
    </main>
  );
}
