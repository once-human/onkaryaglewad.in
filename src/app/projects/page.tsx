import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { projectData } from "@/constants/projectData";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projects | Onkar Yaglewad",
  description: "A showcase of projects built by Onkar Yaglewad, highlighting skills in web development, app development, OS customization, and more.",
  // You might want to add keywords here later for SEO if this page becomes indexable
};

export default function ProjectsPage() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <SectionTitle
        title="My Projects"
        subTitle="A collection of things I've built and contributed to."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
        {projectData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
