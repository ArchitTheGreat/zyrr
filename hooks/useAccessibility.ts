"use client";

import { useEffect, useRef } from "react";

interface UseAccessibilityProps {
  isOpen: boolean;
  onClose?: () => void;
  focusElement?: HTMLElement | null;
}

export function useAccessibility({ isOpen, onClose, focusElement }: UseAccessibilityProps) {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      
      // Focus the modal or a specific element
      if (focusElement) {
        focusElement.focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent background scrolling
      document.body.style.overflow = 'hidden';

      // Handle focus trapping
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as NodeListOf<HTMLElement>;
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
              // Shift + Tab
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              // Tab
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // Restore background scrolling
      document.body.style.overflow = 'unset';
      
      // Return focus to previous element
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    }
  }, [isOpen, focusElement]);

  return { modalRef };
}