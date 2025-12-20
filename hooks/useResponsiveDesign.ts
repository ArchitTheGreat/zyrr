"use client";

import { useEffect, useState } from "react";

interface UseResponsiveDesignProps {
  breakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
    large: number;
  };
}

export function useResponsiveDesign({ 
  breakpoints = {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    large: 1280
  }
}: UseResponsiveDesignProps = {}) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < breakpoints.mobile;
  const isTablet = windowSize.width >= breakpoints.mobile && windowSize.width < breakpoints.tablet;
  const isDesktop = windowSize.width >= breakpoints.tablet && windowSize.width < breakpoints.desktop;
  const isLarge = windowSize.width >= breakpoints.desktop;

  const getResponsiveValue = <T>(values: {
    mobile?: T;
    tablet?: T;
    desktop?: T;
    large?: T;
    default: T;
  }) => {
    if (isLarge && values.large) return values.large;
    if (isDesktop && values.desktop) return values.desktop;
    if (isTablet && values.tablet) return values.tablet;
    if (isMobile && values.mobile) return values.mobile;
    return values.default;
  };

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    getResponsiveValue
  };
}