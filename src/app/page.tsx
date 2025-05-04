import Image from "next/image";
import profilePicture from "./icon.webp";
import { Metadata } from "next";

const ProfilePicture = ({ isMobile }: { isMobile: boolean }) => {
  const imageWidth = isMobile ? 200 : 300;
  const imageHeight = isMobile ? 200 : 300;
  const imageViewType = isMobile ? "md:hidden md-10 mb-10" : "hidden md:block";
  return (
    <div
      className={`pt-8 flex flex-col items-center justify-center ${imageViewType}`}
    >
      <Image
        src={profilePicture}
        alt="Profile picture of Onkar Yaglewad"
        width={imageWidth}
        height={imageHeight}
        quality={100}
        className="rounded-full mx-auto"
        placeholder="blur"
        loading="eager"
        priority
      />
    </div>
  );
};

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
    <div className="md:h-[40rem] h-[38rem] w-full bodyTheme dark:bg-grid-white/[0.16] bg-grid-black/[0.18] relative flex items-start justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bodyTheme [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
      <div className="flex flex-col items-center justify-evenly relative">
        <h1 className="text-3xl md:text-6xl font-bold text-center text-gray-900 dark:text-white relative z-20">
          Hey, everyone!
          <br />
          I&apos;m Onkar Yaglewad.
        </h1>
        <p className="mt-8 font-normal text-base md:text-lg textTertiaryTheme max-w-4xl text-center mx-auto px-4 md:px-0">
          Flutter based cross-platform app developer.
        </p>
        <ProfilePicture isMobile={false} />
        <ProfilePicture isMobile={true} />
        <div className="relative rounded-full md:mt-9 -mt-1.5 px-3 py-1 text-sm leading-6 cardDarkerButtonTheme">
          Seeking contact?{" "}
          <a href="/connect" className="font-semibold textTheme">
            <span className="absolute inset-0" aria-hidden="true" />
            Let&apos;s connect! 💬<span aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </div>
  );
}
