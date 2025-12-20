"use client";

import { useEffect, useRef } from "react";
import { useAccessibility } from "@/hooks/useAccessibility";
import TriptychPreview from "./TriptychPreview";

interface PosterModalProps {
  poster: {
    title: string;
    price: number;
    panelImages: {
      left: string;
      center: string;
      right: string;
    };
  } | null;
  onClose: () => void;
}

export default function PosterModal({ poster, onClose }: PosterModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const { modalRef: accessibilityModalRef } = useAccessibility({
    isOpen: !!poster,
    onClose,
    focusElement: closeButtonRef.current
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (poster) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [poster, onClose]);

  if (!poster) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="poster-modal-title"
      ref={modalRef}
    >
      <div 
        className="bg-black border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <div>
            <h2 
              id="poster-modal-title"
              className="text-2xl font-light text-white tracking-wide"
            >
              {poster.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">Digital Artwork</p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Triptych Preview */}
          <TriptychPreview 
            panelImages={poster.panelImages}
            className="mx-auto"
          />

          {/* Price and Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-800">
            <div>
              <span className="text-sm text-gray-400">Price</span>
              <p className="text-2xl font-light text-white tracking-wide">${poster.price}</p>
            </div>
            
            <button 
              className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Buy artwork"
            >
              BUY
            </button>
          </div>

          {/* Legal Text */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 leading-relaxed open-sans-body">
              Digital artwork only • Personal use • No affiliation with brands or franchises • 
              All artwork is for personal, non-commercial use only • No resale or commercial 
              exploitation permitted • Artwork is provided as-is without warranties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}