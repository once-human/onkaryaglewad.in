"use client"; // Keep as client component for Link consistency if needed, or remove if no client-side interactivity beyond Link

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';

interface FeaturedProjectCardProps {
  project: Project;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project }) => {
  // Create a short, catchy description
  const shortDescription = project.description.split('.')[0] + '.'; // Take the first sentence

  return (
    <Link href={`/projects/${project.id}`} className="block group cardDarkerButtonTheme rounded-xl overflow-hidden shadow-lg h-full transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
      <div className="flex flex-col h-full">
        {project.imageUrl && (
          <div className="relative w-full h-48 group-hover:opacity-90 transition-opacity">
            <Image 
              src={project.imageUrl} 
              alt={`${project.title} image`} 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold textTheme mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{project.title}</h3>
          <p className="textSecondaryTheme text-sm flex-grow line-clamp-3">{shortDescription}</p> 
          {/* Ensure line-clamp for briefness */}
        </div>
        <div className="p-5 pt-2 mt-auto">
          <span className="text-sm font-medium textAccentTheme group-hover:underline">
            Learn more &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProjectCard; 