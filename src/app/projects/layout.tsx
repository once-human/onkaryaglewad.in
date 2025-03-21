import type { Metadata } from "next";
import SiteInfo from "@/config/siteInfo";

export const metadata: Metadata = {
  title: "Projects | " + SiteInfo.username,
  description: "Explore my projects and what I've built.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 