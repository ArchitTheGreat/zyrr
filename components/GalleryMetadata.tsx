"use client";

interface GalleryMetadataProps {
  poster: {
    title: string;
    subtitle?: string;
    description?: string;
    dimensions?: {
      width: number;
      height: number;
      unit: string;
    };
    medium?: string;
    year?: number;
    edition?: string;
    availability: 'available' | 'limited' | 'sold';
    metadata?: {
      aspectRatio: string;
      colorPalette: string[];
      mood: string;
      technique: string;
    };
  };
  className?: string;
}

export default function GalleryMetadata({ poster, className = "" }: GalleryMetadataProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400';
      case 'limited': return 'text-yellow-400';
      case 'sold': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'limited': return 'Limited Edition';
      case 'sold': return 'Sold Out';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title and Subtitle */}
      <div>
        <h2 className="text-3xl font-light text-white tracking-wide">{poster.title}</h2>
        {poster.subtitle && (
          <p className="text-sm text-gray-400 mt-1 tracking-wide">{poster.subtitle}</p>
        )}
      </div>

      {/* Description */}
      {poster.description && (
        <p className="text-sm text-gray-300 leading-relaxed">
          {poster.description}
        </p>
      )}

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* Technical Details */}
        <div className="space-y-3">
          <h3 className="text-xs text-gray-500 uppercase tracking-wide">Technical Details</h3>
          
          {poster.dimensions && (
            <div className="flex justify-between">
              <span className="text-gray-400">Dimensions</span>
              <span className="text-white">
                {poster.dimensions.width} × {poster.dimensions.height} {poster.dimensions.unit}
              </span>
            </div>
          )}
          
          {poster.medium && (
            <div className="flex justify-between">
              <span className="text-gray-400">Medium</span>
              <span className="text-white">{poster.medium}</span>
            </div>
          )}
          
          {poster.year && (
            <div className="flex justify-between">
              <span className="text-gray-400">Year</span>
              <span className="text-white">{poster.year}</span>
            </div>
          )}
          
          {poster.edition && (
            <div className="flex justify-between">
              <span className="text-gray-400">Edition</span>
              <span className="text-white">{poster.edition}</span>
            </div>
          )}
        </div>

        {/* Artistic Details */}
        <div className="space-y-3">
          <h3 className="text-xs text-gray-500 uppercase tracking-wide">Artistic Details</h3>
          
          {poster.metadata?.aspectRatio && (
            <div className="flex justify-between">
              <span className="text-gray-400">Aspect Ratio</span>
              <span className="text-white">{poster.metadata.aspectRatio}</span>
            </div>
          )}
          
          {poster.metadata?.technique && (
            <div className="flex justify-between">
              <span className="text-gray-400">Technique</span>
              <span className="text-white">{poster.metadata.technique}</span>
            </div>
          )}
          
          {poster.metadata?.mood && (
            <div className="flex justify-between">
              <span className="text-gray-400">Mood</span>
              <span className="text-white">{poster.metadata.mood}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-400">Availability</span>
            <span className={`font-medium ${getAvailabilityColor(poster.availability)}`}>
              {getAvailabilityText(poster.availability)}
            </span>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      {poster.metadata?.colorPalette && (
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500 uppercase tracking-wide">Color Palette</h3>
          <div className="flex gap-2">
            {poster.metadata.colorPalette.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-gray-800"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Availability Status */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className={`flex items-center space-x-2 ${getAvailabilityColor(poster.availability)}`}>
          <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(poster.availability)}`} />
          <span className="text-sm font-medium">{getAvailabilityText(poster.availability)}</span>
        </div>
        
        {poster.availability === 'limited' && (
          <span className="text-xs text-gray-400">Limited quantities available</span>
        )}
      </div>
    </div>
  );
}