// JSON data loader for Zyrr Gallery
import { Poster } from '@/lib/posters';

// Cache for JSON data
const jsonCache = new Map();

/**
 * Load posters from JSON file
 */
export async function loadPostersFromJson(): Promise<Poster[]> {
  const cacheKey = 'json-posters';
  const cacheTTL = 5 * 60 * 1000; // 5 minutes
  
  // Check cache first
  const cached = jsonCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    return cached.data;
  }

  try {
    // Import the JSON file
    const postersData = await import('@/data/posters.json');
    
    // Cast JSON data to Poster type with proper type assertion
    const posters = postersData.posters.map((poster: any) => ({
      ...poster,
      // Ensure availability is one of the allowed literal types
      availability: poster.availability as 'available' | 'limited' | 'sold'
    }));
    
    // Cast the JSON data to the proper Poster type
    const typedPosters = posters.map(poster => ({
      ...poster,
      availability: poster.availability as 'available' | 'limited' | 'sold'
    }));

    // Cache the result
    jsonCache.set(cacheKey, {
      data: typedPosters,
      timestamp: Date.now()
    });

    return typedPosters;
  } catch (error) {
    console.error('Error loading posters from JSON:', error);
    return [];
  }
}

/**
 * Get poster by slug from JSON data
 */
export async function getPosterBySlugFromJson(slug: string): Promise<Poster | undefined> {
  const posters = await loadPostersFromJson();
  return posters.find(poster => poster.slug === slug);
}

/**
 * Clear JSON cache
 */
export function clearJsonCache() {
  jsonCache.clear();
}