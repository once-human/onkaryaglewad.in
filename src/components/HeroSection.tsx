'use client';

import React, { useState, useEffect, useRef } from 'react';
import ProfilePicture from './ProfilePicture'; // Assuming relative path
import ScrollIndicator from './ScrollIndicator'; // Assuming relative path
import { type Skill } from './ProfilePicture'; // Import Skill type if needed

// Define props if necessary, e.g., skills data
interface HeroSectionProps {
  skills: Skill[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ skills }) => {
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isVisuallyHovering, setIsVisuallyHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHoveringProfile) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsVisuallyHovering(true);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsVisuallyHovering(false);
      }, 1500);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHoveringProfile]);

  return (
    <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-140px)] w-full bodyTheme dark:bg-grid-white/[0.16] bg-grid-black/[0.18] relative flex items-start justify-center pt-10 md:pt-0">
      {/* Grid background */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bodyTheme [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>

      {/* Content Wrapper */}
      <div className="flex flex-col items-center justify-between relative h-full w-full px-4 py-4">
        {/* Text Content */}
        <div className="text-center z-20"> 
          {/* Headline - Dim color instead of opacity */}
          <h1 className={`text-3xl md:text-6xl font-bold text-gray-900 dark:text-white relative transition-colors duration-500 ease-out 
                         ${isVisuallyHovering ? 'text-neutral-600 dark:text-neutral-500' : 'text-gray-900 dark:text-white'}`}>
            Hey, everyone!
            <br />
            I&apos;m <span className={`text-gray-900 dark:text-white`}>Onkar Yaglewad</span>.
          </h1>
          {/* Tagline - Increase duration */}
          <p className={`mt-4 md:mt-8 mb-4 md:mb-6 font-normal text-base md:text-lg textTertiaryTheme max-w-4xl mx-auto transition-opacity duration-500 ease-out 
                        ${isVisuallyHovering ? 'opacity-0' : 'opacity-100'}`}>
            Flutter based cross-platform app developer.
          </p>
        </div>

        {/* Profile Picture Section - Pass down state and setter */}
        <div className="relative flex-shrink-0 my-4 md:my-0"> 
          <ProfilePicture 
            isMobile={false} 
            skills={skills} 
            isHovering={isHoveringProfile} // Pass state down
            setIsHovering={setIsHoveringProfile} // Pass setter down
          />
          <ProfilePicture 
            isMobile={true} 
            skills={skills} 
            isHovering={isHoveringProfile} 
            setIsHovering={setIsHoveringProfile}
          />
        </div>

        {/* Container for Button - Increase duration */}
        <div className={`flex flex-col items-center z-20 mt-4 md:mt-6 mb-2 transition-opacity duration-500 ease-out 
                       ${isVisuallyHovering ? 'opacity-0' : 'opacity-100'}`}>
           <div className="relative rounded-full px-3 py-1 text-sm leading-6 cardDarkerButtonTheme">
             Seeking contact?{" "}
             <a href="/connect" className="font-semibold textTheme">
               <span className="absolute inset-0" aria-hidden="true" />
               Let&apos;s connect! 💬<span aria-hidden="true"></span>
             </a>
           </div>
        </div>
        {/* Scroll Indicator - Increase duration */}
        <div className={`flex flex-col items-center z-10 mb-4 transition-opacity duration-500 ease-out 
                       ${isVisuallyHovering ? 'opacity-50' : 'opacity-100'}`}>
           <ScrollIndicator /> 
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 