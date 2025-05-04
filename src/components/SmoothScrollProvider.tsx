'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      // You can adjust options here if needed (e.g., lerp, duration)
      // lerp: 0.1, 
      // duration: 1.2,
      // smoothTouch: true, // Might improve touch experience
    });
    lenisRef.current = lenis;

    // RAF loop (Request Animation Frame)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once

  return <>{children}</>; // Just render children, provider handles the effect
};

export default SmoothScrollProvider; 