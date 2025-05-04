"use client";

import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io'; // Using IoIosArrowDown for a softer look

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the indicator if scrolled down more than 50px
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`
        flex flex-col items-center justify-center 
        transition-opacity duration-500 ease-in-out
        // ${isVisible ? 'opacity-100' : 'opacity-0'} // Commented out conditional opacity
        opacity-100 // Make always visible for testing
        pointer-events-none 
        mt-4 md:mt-6 
      `}
      // aria-hidden={!isVisible} // Commented out aria-hidden
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