// JSON-only utility functions for Zyrr Gallery

// Cache for JSON data
const jsonCache = new Map();

/**
 * Get cached posters with automatic cache invalidation
 */
export async function getCachedPosters() {
  const cacheKey = 'posters';
  const cacheTTL = 5 * 60 * 1000; // 5 minutes
  
  // Check cache first
  const cached = jsonCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    return cached.data;
  }

  try {
    const { loadPostersFromJson } = await import('@/lib/utils/jsonLoader');
    const posters = await loadPostersFromJson();
    
    // Cache the result
    jsonCache.set(cacheKey, {
      data: posters,
      timestamp: Date.now()
    });

    return posters;
  } catch (error) {
    console.error('Error fetching cached posters:', error);
    throw error;
  }
}

/**
 * Get a poster by slug with caching
 */
export async function getPosterBySlug(slug: string) {
  const cacheKey = `poster-${slug}`;
  const cacheTTL = 10 * 60 * 1000; // 10 minutes
  
  // Check cache first
  const cached = jsonCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    return cached.data;
  }

  try {
    const { getPosterBySlugFromJson } = await import('@/lib/utils/jsonLoader');
    const poster = await getPosterBySlugFromJson(slug);
    
    // Cache the result
    jsonCache.set(cacheKey, {
      data: poster,
      timestamp: Date.now()
    });

    return poster;
  } catch (error) {
    console.error('Error fetching poster by slug:', error);
    throw error;
  }
}

/**
 * Clear all cached data
 */
export function clearCache() {
  jsonCache.clear();
  console.log('JSON cache cleared');
}

/**
 * Create a new poster (not supported in JSON mode)
 */
export async function createPoster(posterData: any) {
  throw new Error('Create operation not supported in JSON mode');
}

/**
 * Get database type for debugging
 */
export function getDatabaseType() {
  return 'json';
}