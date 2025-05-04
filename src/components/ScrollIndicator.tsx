"use client";

import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useLenis } from './SmoothScrollProvider';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    console.log("ScrollIndicator Effect: Lenis instance?", lenis ? "Yes" : "No");
    if (!lenis) return;

    const handleScroll = (e: { scroll: number }) => {
      console.log("Lenis Scroll Event: scroll =", e.scroll);
      if (e.scroll > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]);

  return (
    <div
      className={`
        flex flex-col items-center justify-center 
        transition-opacity duration-500 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'} 
        pointer-events-none 
        mt-4 md:mt-6 
      `}
      aria-hidden={!isVisible}
    >
      <p className="text-xs font-light textSecondaryTheme mb-1">
        Scroll Down to View Projects
      </p>
      <IoIosArrowDown 
        size={20} 
        className="textSecondaryTheme animate-bounce-subtle"
      />
    </div>
  );
};

export default ScrollIndicator; 