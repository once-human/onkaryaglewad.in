import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import WebLinks from "@/constants/links";
import SiteInfo from "@/config/siteInfo";

export default function SocialMediaBar() {
  const iconSize = 20 as number;

  return (
    <div className="flex flex-row items-center justify-center">
      <Link
        href={WebLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 textButtonTheme transitionButtonTheme"
        aria-label={`Visit Linkedin profile of ${SiteInfo.username}`}
      >
        <FaLinkedinIn size={iconSize} />
      </Link>
      <Link
        href={WebLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 textButtonTheme transitionButtonTheme"
        aria-label={`Visit Instagram profile of ${SiteInfo.username}`}
      >
        <FaInstagram size={iconSize} />
      </Link>
      <Link
        href={`${WebLinks.github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 textButtonTheme transitionButtonTheme"
        aria-label={`Visit GitHub profile of ${SiteInfo.username}`}
      >
        <FaGithub size={iconSize} />
      </Link>
      <Link
        href={`mailto:${WebLinks.email}`}
        rel="noopener noreferrer"
        className="textButtonTheme transitionButtonTheme"
        aria-label={`Send email to ${SiteInfo.username}`}
      >
        <MdEmail size={iconSize} />
      </Link>
    </div>
  );
}
