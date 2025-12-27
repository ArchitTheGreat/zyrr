"use client";

import { useState, useEffect, useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { useAmbientAnimation } from "@/hooks/useAmbientAnimation";
import { posters } from "@/lib/posters";
import PosterModal from "@/components/PosterModal";
import TriptychPreview from "@/components/TriptychPreview";
import SkeletonLoader from "@/components/SkeletonLoader";
import GalleryMetadata from "@/components/GalleryMetadata";

export default function Home() {
  const [selectedPoster, setSelectedPoster] = useState<typeof posters[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll management
  const { currentIndex, isScrolling, scrollNext, scrollPrev } = useSmoothScroll({
    totalItems: posters.length,
    onIndexChange: (index) => {
      // Preload next/previous images for better UX
      const preloadIndex = Math.min(Math.max(index + 1, 0), posters.length - 1);
      const nextPoster = posters[preloadIndex];
      if (nextPoster) {
        const img = new Image();
        img.src = nextPoster.previewImage;
      }
    }
  });

  // Keyboard navigation
  useKeyboardNavigation({
    currentIndex,
    totalItems: posters.length,
    onNavigate: (direction) => {
      direction === 'next' ? scrollNext() : scrollPrev();
    }
  });

  // Responsive design
  const { isMobile, isTablet, getResponsiveValue } = useResponsiveDesign();

  // Ambient animations
  const { float, pulse, drift } = useAmbientAnimation({
    enabled: !isMobile,
    intensity: 0.5,
    speed: 0.8
  });

  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePosterClick = (poster: typeof posters[0]) => {
    setSelectedPoster(poster);
  };

  const handleCloseModal = () => {
    setSelectedPoster(null);
  };

  // Get responsive styles
  const getResponsiveStyles = () => {
    return {
      titleSize: getResponsiveValue({
        mobile: "text-4xl",
        tablet: "text-5xl", 
        desktop: "text-6xl",
        large: "text-7xl",
        default: "text-5xl"
      }),
      padding: getResponsiveValue({
        mobile: "p-6",
        tablet: "p-8",
        desktop: "p-12",
        large: "p-16",
        default: "p-8"
      }),
      maxWidth: getResponsiveValue({
        mobile: "max-w-2xl",
        tablet: "max-w-3xl",
        desktop: "max-w-4xl",
        large: "max-w-5xl",
        default: "max-w-4xl"
      })
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div 
      ref={galleryRef}
      className="snap-y snap-mandatory h-screen overflow-y-scroll snap-always bg-black" 
      style={{ 
        scrollBehavior: 'auto',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollSnapType: 'y mandatory'
      }}
    >
      {/* Gallery Items */}
      {posters.map((poster, index) => (
        <section 
          key={poster.id}
          className={`snap-start snap-always h-screen flex items-center justify-center bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-[2px] relative group transition-colors duration-500 ${
            isScrolling && Math.abs(index - currentIndex) > 1 ? 'opacity-95' : 'opacity-100'
          }`}
          style={{
            transform: isScrolling ? `translateY(${(index - currentIndex) * float}px)` : 'none'
          }}
        >
          {/* Loading State */}
          {isLoading && (
            <SkeletonLoader type="gallery" className="w-full h-full" />
          )}

          {/* Completely Black Background with Glass Blur Effect */}
          {!isLoading && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-[2px]">
              {/* Ambient Particles Only */}
              {!isMobile && (
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-full animate-ping"
                    style={{ animationDuration: '3s', animationDelay: '0s' }}
                  />
                  <div 
                    className="absolute top-20 right-10 w-1 h-1 bg-white/10 rounded-full animate-ping"
                    style={{ animationDuration: '4s', animationDelay: '1s' }}
                  />
                  <div 
                    className="absolute bottom-10 left-1/2 w-1 h-1 bg-white/15 rounded-full animate-ping"
                    style={{ animationDuration: '5s', animationDelay: '2s' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Content Overlay - Centered and Prominent */}
          {!isLoading && (
            <div className={`relative z-10 text-center text-white ${responsiveStyles.padding} ${responsiveStyles.maxWidth} mx-auto`}>
              {/* Triptych Preview - Now the Main Focus */}
              <div className="max-w-4xl mx-auto mb-6 cursor-pointer group" onClick={() => handlePosterClick(poster)}>
                <TriptychPreview 
                  panelImages={poster.panelImages}
                  className="opacity-100 group-hover:opacity-100 transition-all duration-500 scale-110"
                />
              </div>

              {/* Title - Large and Bold */}
              <h1 className={`${responsiveStyles.titleSize} font-light mb-4 tracking-wide transition-all duration-500 group-hover:tracking-widest elms-sans-display`}>
                {poster.title}
              </h1>
              
              {/* Subtitle */}
              {poster.subtitle && (
                <p className="text-sm text-gray-400 mb-6 tracking-wide opacity-80 open-sans-body">
                  {poster.subtitle}
                </p>
              )}

              {/* CTA */}
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button 
                  onClick={() => handlePosterClick(poster)}
                  className="text-sm text-gray-400 tracking-wide bg-black/30 px-4 py-2 rounded-full border border-gray-700 hover:bg-black/50 hover:text-white transition-colors cursor-pointer open-sans-body"
                >
                  Inquire
                </button>
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Poster Modal with Enhanced Features */}
      <PosterModal 
        poster={selectedPoster} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
