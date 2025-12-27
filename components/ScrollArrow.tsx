"use client";

interface ScrollArrowProps {
  direction: 'up' | 'down';
  onClick: () => void;
  visible: boolean;
}

export default function ScrollArrow({ direction, onClick, visible }: ScrollArrowProps) {
  return (
    <button
      className={`fixed ${direction === 'down' ? 'bottom-8' : 'top-8'} right-8 z-40
        bg-black/40 backdrop-blur-sm border border-gray-700 rounded-full p-3
        hover:bg-black/60 transition-all duration-300
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClick}
      aria-label={`${direction === 'down' ? 'Scroll down' : 'Scroll up'}`}
    >
      <svg className={`w-6 h-6 text-white ${direction === 'down' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  )
}