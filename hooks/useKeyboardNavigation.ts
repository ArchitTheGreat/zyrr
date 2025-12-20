"use client";

import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  currentIndex: number;
  totalItems: number;
  onNavigate: (direction: 'next' | 'prev') => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  currentIndex,
  totalItems,
  onNavigate,
  enabled = true
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if not typing in an input or textarea
      const activeElement = document.activeElement;
      const isInput = activeElement?.tagName === 'INPUT' || 
                     activeElement?.tagName === 'TEXTAREA' || 
                     activeElement?.tagName === 'SELECT';
      
      if (isInput) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex < totalItems - 1) {
            onNavigate('next');
          }
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex > 0) {
            onNavigate('prev');
          }
          break;
        case 'Home':
          e.preventDefault();
          if (currentIndex !== 0) {
            onNavigate('prev');
          }
          break;
        case 'End':
          e.preventDefault();
          if (currentIndex !== totalItems - 1) {
            onNavigate('next');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalItems, onNavigate, enabled]);
}