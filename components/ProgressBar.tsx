"use client";

interface ProgressBarProps {
  currentIndex: number;
  totalItems: number;
}

export default function ProgressBar({ currentIndex, totalItems }: ProgressBarProps) {
  const progress = ((currentIndex + 1) / totalItems) * 100

  return (
    <div className="fixed left-0 top-0 h-full w-1 z-30 pointer-events-none">
      <div
        className="bg-white/30 h-full transition-all duration-300 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  )
}