"use client";

interface SkeletonLoaderProps {
  type?: 'gallery' | 'modal' | 'preview';
  className?: string;
}

export default function SkeletonLoader({ type = 'gallery', className = "" }: SkeletonLoaderProps) {
  if (type === 'gallery') {
    return (
      <div className={`animate-pulse ${className}`}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black" />
        
        {/* Content Area */}
        <div className="relative z-10 text-center text-white p-8 max-w-4xl mx-auto">
          {/* Title */}
          <div className="h-16 bg-gray-700 rounded-lg mb-8 mx-auto w-3/4" />
          
          {/* Triptych Preview */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex-1 aspect-[3/4] bg-gray-700" />
              <div className="flex-1 aspect-[3/4] bg-gray-700 border-x border-gray-600" />
              <div className="flex-1 aspect-[3/4] bg-gray-700" />
            </div>
          </div>

          {/* Price */}
          <div className="mt-8 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-1/4 mx-auto" />
            <div className="h-8 bg-gray-700 rounded w-1/6 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'modal') {
    return (
      <div className={`animate-pulse ${className}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <div className="space-y-2">
            <div className="h-8 bg-gray-700 rounded w-48" />
            <div className="h-4 bg-gray-700 rounded w-24" />
          </div>
          <div className="h-8 w-8 bg-gray-700 rounded-full" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Triptych Preview */}
          <div className="flex gap-2 bg-gray-800 rounded-lg overflow-hidden mx-auto max-w-2xl">
            <div className="flex-1 aspect-[3/4] bg-gray-700" />
            <div className="flex-1 aspect-[3/4] bg-gray-700 border-x border-gray-600" />
            <div className="flex-1 aspect-[3/4] bg-gray-700" />
          </div>

          {/* Price and Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-800">
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-16" />
              <div className="h-6 bg-gray-700 rounded w-20" />
            </div>
            
            <div className="flex gap-4">
              <div className="h-10 bg-gray-700 rounded w-32" />
              <div className="h-10 bg-gray-700 rounded w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'preview') {
    return (
      <div className={`animate-pulse ${className}`}>
        {/* Title */}
        <div className="h-4 bg-gray-700 rounded w-24 mx-auto mb-4" />
        
        {/* Triptych Panels */}
        <div className="flex gap-2 bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex-1 aspect-[3/4] bg-gray-700" />
          <div className="flex-1 aspect-[3/4] bg-gray-700 border-x border-gray-600" />
          <div className="flex-1 aspect-[3/4] bg-gray-700" />
        </div>

        {/* Caption */}
        <div className="h-3 bg-gray-700 rounded w-48 mx-auto mt-4" />
      </div>
    );
  }

  return null;
}