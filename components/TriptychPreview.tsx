"use client";

import { useState } from "react";
import LazyImage from "./LazyImage";

interface TriptychPreviewProps {
  panelImages: {
    left: string;
    center: string;
    right: string;
  };
  className?: string;
  interactive?: boolean;
}

export default function TriptychPreview({ 
  panelImages, 
  className = "", 
  interactive = true 
}: TriptychPreviewProps) {
  const [hoveredPanel, setHoveredPanel] = useState<'left' | 'center' | 'right' | null>(null);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Triptych Panels */}
      <div className="flex gap-3 bg-black rounded-lg overflow-hidden shadow-2xl">
        {/* Left Panel */}
        <div 
          className={`flex-1 aspect-[2/3] bg-gray-900 relative group cursor-pointer transition-all duration-500 ${
            hoveredPanel === 'left' ? 'scale-105 z-20' : 
            hoveredPanel === 'center' ? 'scale-95 opacity-75' : 
            hoveredPanel === 'right' ? 'scale-95 opacity-75' : 
            'hover:scale-102'
          }`}
          onMouseEnter={() => interactive && setHoveredPanel('left')}
          onMouseLeave={() => interactive && setHoveredPanel(null)}
        >
          <LazyImage 
            src={panelImages.left} 
            alt="Left panel"
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
          {hoveredPanel === 'left' && (
            <div className="absolute inset-0 border-2 border-gray-600 rounded-lg pointer-events-none" />
          )}
        </div>

        {/* Center Panel (Emphasized) */}
        <div 
          className={`flex-1 aspect-[2/3] bg-gray-900 relative group cursor-pointer border-x border-gray-800 transition-all duration-500 ${
            hoveredPanel === 'center' ? 'scale-110 z-30 shadow-xl' : 
            hoveredPanel ? 'scale-95 opacity-75' : 
            'hover:scale-102'
          }`}
          onMouseEnter={() => interactive && setHoveredPanel('center')}
          onMouseLeave={() => interactive && setHoveredPanel(null)}
        >
          <LazyImage 
            src={panelImages.center} 
            alt="Center panel"
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/15 to-transparent pointer-events-none" />
          {hoveredPanel === 'center' && (
            <div className="absolute inset-0 border-2 border-gray-500 rounded-lg shadow-lg pointer-events-none" />
          )}
        </div>

        {/* Right Panel */}
        <div 
          className={`flex-1 aspect-[2/3] bg-gray-900 relative group cursor-pointer transition-all duration-500 ${
            hoveredPanel === 'right' ? 'scale-105 z-20' : 
            hoveredPanel === 'center' ? 'scale-95 opacity-75' : 
            hoveredPanel === 'left' ? 'scale-95 opacity-75' : 
            'hover:scale-102'
          }`}
          onMouseEnter={() => interactive && setHoveredPanel('right')}
          onMouseLeave={() => interactive && setHoveredPanel(null)}
        >
          <LazyImage 
            src={panelImages.right} 
            alt="Right panel"
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 pointer-events-none" />
          {hoveredPanel === 'right' && (
            <div className="absolute inset-0 border-2 border-gray-600 rounded-lg pointer-events-none" />
          )}
        </div>
      </div>

      {/* Caption */}
      <p className="text-xs text-gray-500 text-center tracking-wide">
        Designed as a 3-panel wall artwork
      </p>
    </div>
  );
}