"use client";

import { useEffect, useRef, useState } from "react";

interface UseSmoothScrollProps {
  totalItems: number;
  onIndexChange?: (index: number) => void;
  scrollSensitivity?: number;
  inertiaMultiplier?: number;
}

export function useSmoothScroll({
  totalItems,
  onIndexChange,
  scrollSensitivity = 0.3,
  inertiaMultiplier = 0.8
}: UseSmoothScrollProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(Date.now());
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate current index based on scroll position
      const newIndex = Math.round(scrollY / windowHeight);
      const clampedIndex = Math.max(0, Math.min(newIndex, totalItems - 1));
      
      // Only update if index actually changed
      if (clampedIndex !== currentIndex) {
        setCurrentIndex(clampedIndex);
        onIndexChange?.(clampedIndex);
      }

      // Track scrolling state
      setIsScrolling(true);
      lastScrollTimeRef.current = now;
      lastScrollYRef.current = scrollY;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentIndex, totalItems, onIndexChange]);

  const scrollToIndex = (index: number, smooth = true) => {
    const clampedIndex = Math.max(0, Math.min(index, totalItems - 1));
    const targetY = clampedIndex * window.innerHeight;
    
    if (smooth) {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, targetY);
    }
    
    setCurrentIndex(clampedIndex);
    onIndexChange?.(clampedIndex);
  };

  const scrollNext = () => {
    if (currentIndex < totalItems - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  return {
    currentIndex,
    isScrolling,
    scrollToIndex,
    scrollNext,
    scrollPrev
  };
}