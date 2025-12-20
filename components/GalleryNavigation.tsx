"use client";

interface GalleryNavigationProps {
  currentIndex: number;
  totalItems: number;
}

export default function GalleryNavigation({ currentIndex, totalItems }: GalleryNavigationProps) {
  return (
    <div className="fixed top-6 left-6 z-40">
      <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2">
        <span className="text-sm font-light text-gray-300 tracking-wide">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}