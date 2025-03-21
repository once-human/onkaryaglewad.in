import type { Metadata } from "next";
import SiteInfo from "@/config/siteInfo";

export const metadata: Metadata = {
  title: "Highlights | " + SiteInfo.siteName,
  description: "Key highlights and notable events from my journey.",
};

export default function HighlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 