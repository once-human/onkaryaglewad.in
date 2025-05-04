'use client';

import React, { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

// Create Context
const LenisContext = createContext<Lenis | null>(null);

// Custom hook to use the context
export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      // Reverting lerp to default
      lerp: 0.1, // Explicitly set near default
      // duration: 1.2, // Keep default
      // smoothTouch: true, // Removed invalid option
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

  return (
    // Provide the ref's current value (the Lenis instance)
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScrollProvider;
