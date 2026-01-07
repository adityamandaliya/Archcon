import Hero from "@/components/sections/Hero";
import Redevelopment from "@/components/sections/Redevelopment";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProjectMap from "@/components/sections/ProjectMap";
import CorporateIdentity from "@/components/sections/CorporateIdentity";
import Contact from "@/components/sections/Contact";
import MotionStatement from "@/components/sections/MotionStatement";
import SubCompaniesSection from "@/components/sections/SubCompaniesSection";








export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Redevelopment />
      <ProjectMap />
      <WhyChooseUs />
      <MotionStatement />
      <SubCompaniesSection />
      <CorporateIdentity />
      <Contact />
    </main>
  );
}
