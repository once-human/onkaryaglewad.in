"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import profilePicture from "@/app/icon.webp"; // Adjust import path

// Export the Skill type
export type Skill = {
  name: string;
  angle: number;
  radiusFactor: number;
};

// Define the props for the component - Add props back
type ProfilePictureProps = {
  isMobile: boolean;
  skills: Skill[];
  isHovering: boolean;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfilePicture = ({ 
  isMobile, 
  skills, 
  isHovering, // Use prop
  setIsHovering // Use prop
}: ProfilePictureProps) => {
  // Remove local state again
  // const [isHovering, setIsHovering] = useState(false);
  
  // Add state for delayed hint visibility
  const [isHintVisible, setIsHintVisible] = useState(true);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to manage hint visibility with delay
  useEffect(() => {
    // Clear any existing timeout if hover state changes quickly
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = null;
    }

    if (isHovering) {
      setIsHintVisible(false); // Hide hint immediately on hover
    } else {
      // Set a timeout to show the hint after 3 seconds
      hintTimeoutRef.current = setTimeout(() => {
        setIsHintVisible(true);
      }, 3000); // Changed delay to 3000ms (3 seconds)
    }

    // Cleanup function
    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
    };
  }, [isHovering]); // Dependency array includes isHovering

  const imageSize = isMobile ? 200 : 300;
  // Adjust base multiplier slightly
  const baseRadiusMultiplier = isMobile ? 0.6 : 0.6; 

  // Removed particle animation effect

  // Function to calculate bubble position with randomness and layering
  const getPosition = (angle: number, radius: number) => {
    // Use original angle and radius directly
    const finalAngleRad = (angle * Math.PI) / 180;
    const finalRadius = radius; 

    // Apply elliptical scaling: make x-radius larger, y-radius smaller
    const xRadius = finalRadius * 1.20; // Stretch horizontally (e.g., by 20%)
    const yRadius = finalRadius * 0.75; // Compress vertically (e.g., by 25%)

    // Calculate position based on final angle and scaled radii
    const x = 50 + (xRadius / imageSize) * 100 * Math.cos(finalAngleRad);
    const y = 50 + (yRadius / imageSize) * 100 * Math.sin(finalAngleRad);

    return { top: `${y}%`, left: `${x}%` };
  };

  const imageViewType = isMobile ? "md:hidden mb-10" : "hidden md:block";

  // Calculate shared initial radius for positioning ghost/hidden bubbles
  const initialRadius = imageSize * baseRadiusMultiplier * 0.6;

  // --- Removed Ghost Bubble Setup --- 
  // const ghostSkill = skills.length > 0 ? skills[0] : null; 
  // const ghostInitialPos = ghostSkill ? getPosition(ghostSkill.angle, initialRadius) : { top: '50%', left: '50%' };
  // const ghostInitialOpacity = isHovering ? 0 : 0.4; 
  // --- End Removal ---

  return (
    <div
      className={`flex items-center justify-center ${imageViewType} relative`}
      style={{ width: imageSize, height: imageSize, margin: 'auto' }}
    >
      {/* Wrapper for Image hover events */}
      <div
        className="relative rounded-full cursor-pointer" 
        onMouseEnter={() => setIsHovering(true)} // Use passed setter
        onMouseLeave={() => setIsHovering(false)} // Use passed setter
      >
        <Image
          src={profilePicture}
          alt="Profile picture of Onkar Yaglewad"
          width={imageSize}
          height={imageSize}
          quality={100}
          className="rounded-full transition-transform duration-300 ease-out group-hover:scale-105" // Removed breathing
          placeholder="blur"
          loading="eager"
          priority
        />
      </div>

      {/* Arrow + Text Hint Container - Adjusted visibility & text pos */}
      <div className={`absolute top-[20%] left-[-95px] hidden md:flex flex-col items-center 
                     pointer-events-none z-20 transition-opacity duration-300 ease-out 
                     ${isHintVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hint Text - Moved further down */}
        <p className="relative top-12 -left-8 text-xs text-neutral-500 dark:text-neutral-400">
          Hover for tech stack
        </p>
        {/* Curved Arrow SVG */}
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" 
             className="text-neutral-400 dark:text-neutral-500 transform rotate-[25deg]">
             {/* Restored curved arrow attributes */}
          <path d="M58 2C58 2 44.0446 2.00001 33.007 2C19.3506 2 10.2307 11.7411 7.04018 18.3197C3.84968 24.8982 2 38 2 38" 
                stroke="currentColor" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round"/>
          {/* Arrow head */}
          <path d="M3.5 32L2 38L8 36.5" stroke="currentColor" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      {/* Mapped Skill Bubbles (Start hidden) */}
      {skills.map((skill, index) => {
        // Define hidden state
        const hiddenPos = getPosition(skill.angle, initialRadius); // Use shared initialRadius
        const hiddenScale = 1.0;
        const hiddenOpacity = 0;

        // Define revealed state
        const revealedRadius = imageSize * baseRadiusMultiplier * skill.radiusFactor * 1.0;
        const revealedPos = getPosition(skill.angle, revealedRadius);
        const revealedScale = 1.0;
        let revealedLayerOpacity = 0.5; 
        if (skill.radiusFactor < 0.9) { revealedLayerOpacity = 1.0; } 
        else if (skill.radiusFactor < 1.3) { revealedLayerOpacity = 0.7; } 
        else { revealedLayerOpacity = 0.5; }

        // Determine current state based ONLY on hover 
        const currentPos = isHovering ? revealedPos : hiddenPos;
        const currentScale = isHovering ? revealedScale : hiddenScale;
        const currentOpacity = isHovering ? revealedLayerOpacity : hiddenOpacity;

        const staggerDelay = `${0.1 + index * 0.04}s`; 

        return (
          <div
            key={index}
            // Base styling - uses solid background 
            className={`absolute px-3 py-1.5 text-xs font-medium text-neutral-100 
                       bg-gray-900/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-full 
                       shadow-lg whitespace-nowrap pointer-events-none
                       ${isHovering ? 'animate-float' : ''}` // Float only on hover
            }
            style={{
              top: currentPos.top,
              left: currentPos.left,
              transform: `translate(-50%, -50%) scale(${currentScale})`,
              opacity: currentOpacity, // Starts at 0, transitions on hover
              zIndex: Math.max(1, Math.round((1.5 - skill.radiusFactor) * 10)),
              transitionProperty: 'top, left, transform, opacity',
              transitionDuration: '600ms', 
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: staggerDelay,
            }}
          >
            {skill.name}
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePicture; 