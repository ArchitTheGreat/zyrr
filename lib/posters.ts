export interface Poster {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  previewImage: string;
  panelImages: {
    left: string;
    center: string;
    right: string;
  };
  price: number;
  dimensions?: {
    width: number;
    height: number;
    unit: string;
  };
  medium?: string;
  year?: number;
  edition?: string;
  availability: 'available' | 'limited' | 'sold';
  variants?: {
    size: string;
    price: number;
    dimensions: string;
  }[];
  metadata?: {
    aspectRatio: string;
    colorPalette: string[];
    mood: string;
    technique: string;
  };
}

// Import posters from JSON file using the loader
import { loadPostersFromJson } from '@/lib/utils/jsonLoader';

// Load posters asynchronously
export const getPosters = async (): Promise<Poster[]> => {
  return await loadPostersFromJson();
};

// For backward compatibility, we'll export an empty array initially
// and let components load the data asynchronously
export const posters: Poster[] = [];
