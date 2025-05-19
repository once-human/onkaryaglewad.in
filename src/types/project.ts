export interface Project {
  id: string;
  title: string;
  description: string;
  personalNotes?: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  repoUrl?: string;
} 