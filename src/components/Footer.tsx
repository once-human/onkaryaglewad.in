import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import WebLinks from "@/constants/links";
import packageJson from "../../package.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  // TODO: Potentially fetch version dynamically from package.json during build?
  const version = "2.4.1"; // Updated version
  const repoUrl = "https://github.com/once-human/onkaryaglewad.in";

  return (
    <footer className="mt-auto py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <p className="mb-2">
          Copyright © {currentYear} Onkar Yaglewad
        </p>
        <p className="mb-2">
          Version {version} | Built with Next.js {process.env.NEXT_RUNTIME === 'edge' ? 'Edge' : process.env.NEXT_PUBLIC_NEXT_JS_VERSION || ''}
        </p>
        <Link
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <FaGithub className="h-4 w-4" />
          View Source
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
