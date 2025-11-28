import Projects from "@/components/sections/Projects";

export const metadata = {
  title: "Our Projects | Archcon",
  description:
    "Explore our portfolio of residential, commercial, and industrial projects transforming Mumbai's skyline.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Projects />
    </main>
  );
}
