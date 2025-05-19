"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';
import { FiExternalLink, FiGithub } from 'react-icons/fi'; // Using FiGithub for repo

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="cardDarkerButtonTheme rounded-xl overflow-hidden shadow-lg flex flex-col h-full transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl focus-within:ring-2 focus-within:ring-primary-500 dark:focus-within:ring-primary-400">
      <Link href={`/projects/${project.id}`} className="block flex flex-col h-full group focus:outline-none">
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
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold textTheme mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{project.title}</h3>
          <p className="textSecondaryTheme text-sm mb-3 flex-grow line-clamp-4">{project.description}</p>
          {project.personalNotes && (
            <p className="text-xs italic textAccentTheme mb-4 line-clamp-2">{project.personalNotes}</p>
          )}
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold textTheme mb-1">Key Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2 py-1 text-xs bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full">
                  + {project.technologies.length - 5} more
                </span>
              )}
            </div>
          </div>

          <div className="mt-auto flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700/50">
            {project.projectUrl && (
              <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer" 
                    className="textButtonTheme transitionButtonTheme inline-flex items-center text-sm hover:underline z-10">
                View Project <FiExternalLink className="ml-1.5" />
              </Link>
            )}
            {project.repoUrl && (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" 
                    className="textButtonTheme transitionButtonTheme inline-flex items-center text-sm hover:underline z-10">
                View Repository <FiGithub className="ml-1.5" />
              </Link>
            )}
            {!project.projectUrl && !project.repoUrl && (
              <span className="text-sm textSecondaryTheme italic">No external links available</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard; 