// Keep as Server Component (no 'use client')

import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import HeroSection from "@/components/HeroSection";
import { FaArrowRight } from "react-icons/fa";

// Define the skills with updated radiusFactors for desired overlap

// Layer 1: Inner (radiusFactor: 0.83)
const layer1Skills = [
  { name: "Flutter", angle: 50, radiusFactor: 0.83 },
  { name: "Node.js", angle: 75, radiusFactor: 0.83 },
  { name: "Git", angle: 135, radiusFactor: 0.83 },
  { name: "SQL", angle: 195, radiusFactor: 0.83 }, // Changed from MySQL for variety
  { name: "Firebase", angle: 255, radiusFactor: 0.83 },
  { name: "TypeScript", angle: 315, radiusFactor: 0.83 },
  { name: "Tailwind CSS", angle: 375, radiusFactor: 0.83 }, 
];

// Layer 2: Outer (radiusFactor: 1.15) - Increased spread
const layer2Skills = [
  { name: "React", angle: 40, radiusFactor: 1.15 },
  { name: "Docker", angle: 105, radiusFactor: 1.15 },
  { name: "AWS", angle: 165, radiusFactor: 1.15 },
  { name: "Supabase", angle: 225, radiusFactor: 1.15 },
  { name: "Python", angle: 285, radiusFactor: 1.15 },
  { name: "Next.js", angle: 345, radiusFactor: 1.15 },
  { name: "Figma", angle: 415, radiusFactor: 1.15 },
];

// Layer 3: Outermost (radiusFactor: 1.45) - Adjusting angles for visibility
const layer3Skills = [
  { name: "Kotlin", angle: 30, radiusFactor: 1.45 },
  { name: "Django", angle: 110, radiusFactor: 1.45 }, // Adjusted from 95
  { name: "Java", angle: 150, radiusFactor: 1.45 },
  { name: "Arch Linux", angle: 210, radiusFactor: 1.45 },
  { name: "Vercel", angle: 330, radiusFactor: 1.45 },
  { name: "Notion", angle: 375, radiusFactor: 1.45 }, 
  
  // New additions for corners/cardinals
  { name: "Canva", angle: 0, radiusFactor: 1.45 },    
  { name: "Angular", angle: 65, radiusFactor: 1.45 },  
  { name: "Bash Scripting", angle: 60, radiusFactor: 1.45 }, // Adjusted from 70
  { name: "Bootstrap", angle: 125, radiusFactor: 1.45 }, 
  { name: "Nginx", angle: 180, radiusFactor: 1.45 },   
  { name: "Jetpack Compose", angle: 230, radiusFactor: 1.45 }, 
  { name: "C++", angle: 250, radiusFactor: 1.45 }, // Adjusted from 260
  { name: "MySQL", angle: 310, radiusFactor: 1.45 },   
];

// Combine all layers
const skills = [...layer1Skills, ...layer2Skills, ...layer3Skills];

// Placeholder data for featured projects
const featuredProjects = [
  {
    title: "Project Alpha",
    description: "A brief description of Project Alpha, showcasing key features.",
    image: "/images/blog/placeholder.png",
    link: "/projects/alpha",
  },
  {
    title: "Project Beta",
    description: "An overview of Project Beta and its innovative solutions.",
    image: "/images/blog/placeholder.png",
    link: "/projects/beta",
  },
  {
    title: "Project Gamma",
    description: "Details about Project Gamma, highlighting its impact.",
    image: "/images/blog/placeholder.png",
    link: "/projects/gamma",
  },
];

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the portfolio of Onkar Yaglewad. Discover projects, skills, and experiences in software development.",
  openGraph: {
    title: "Home | Onkar Yaglewad",
    description: "Welcome to the portfolio of Onkar Yaglewad.",
  },
  twitter: {
    title: "Home | Onkar Yaglewad",
    description: "Welcome to the portfolio of Onkar Yaglewad.",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection skills={skills} />

      <section className="py-12 md:py-20 bodyTheme">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Featured Projects" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <Link href={project.link} key={index} className="block group">
                <div className="rounded-xl overflow-hidden cardDarkerButtonTheme h-full flex flex-col">
                  <div className="relative w-full h-48">
                    <Image
                      src={project.image}
                      alt={`Image of ${project.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold textTheme mb-2">{project.title}</h3>
                    <p className="textSecondaryTheme text-sm flex-grow">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/projects" 
                  className="group flex items-center text-sm font-medium textButtonTheme transitionButtonTheme">
              View More Projects
              <FaArrowRight 
                className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1" 
                size={14} 
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
