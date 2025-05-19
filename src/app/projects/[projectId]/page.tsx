import { projectData } from "@/constants/projectData";
import { Project } from "@/types/project";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiExternalLink, FiGithub, FiArrowLeft } from "react-icons/fi";
import { notFound } from 'next/navigation';

interface ProjectPageParams {
  params: {
    projectId: string;
  };
}

export async function generateMetadata({ params }: ProjectPageParams): Promise<Metadata> {
  const project = projectData.find((p) => p.id === params.projectId);
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project does not exist.",
    };
  }
  return {
    title: `${project.title} | Projects | Onkar Yaglewad`,
    description: project.description.substring(0, 160), // Keep it concise for meta description
    openGraph: {
      title: project.title,
      description: project.description.substring(0, 160),
      images: project.imageUrl ? [{ url: project.imageUrl }] : [],
    },
  };
}

export async function generateStaticParams() {
  return projectData.map((project) => ({
    projectId: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageParams) {
  const project = projectData.find((p) => p.id === params.projectId);

  if (!project) {
    notFound(); 
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <Link href="/projects" 
              className="inline-flex items-center textButtonTheme transitionButtonTheme hover:underline text-sm">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      <article className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        {project.imageUrl && (
          <div className="relative w-full h-64 md:h-96">
            <Image 
              src={project.imageUrl} 
              alt={`${project.title} cover image`} 
              layout="fill" 
              objectFit="cover"
              priority 
            />
          </div>
        )}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold textTheme mb-4">{project.title}</h1>
          
          {project.personalNotes && (
            <p className="text-md italic textAccentTheme mb-6 bg-primary-50 dark:bg-primary-900/30 p-4 rounded-md">
              {project.personalNotes}
            </p>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
            <h2 className="text-xl font-semibold textTheme mb-2">About this project:</h2>
            <p>{project.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold textTheme mb-3">Technologies Used:</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {project.projectUrl && (
              <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer" 
                    className="inline-flex items-center text-lg font-medium textButtonTheme transitionButtonTheme hover:underline">
                View Live Project <FiExternalLink className="ml-2 h-5 w-5" />
              </Link>
            )}
            {project.repoUrl && (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" 
                    className="inline-flex items-center text-lg font-medium textButtonTheme transitionButtonTheme hover:underline">
                View Repository <FiGithub className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </section>
  );
} 