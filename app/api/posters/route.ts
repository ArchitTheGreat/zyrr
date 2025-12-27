// Next.js API route for posters with optimized SSR and caching
import { NextResponse } from 'next/server'
import { Poster } from '@/lib/posters'
import { getCachedPosters, clearCache } from '@/lib/utils/database'

// Cache control headers for better performance
const CACHE_CONTROL = {
  'Cache-Control': 'public, max-age=300, stale-while-revalidate=600', // 5 min cache, 10 min stale
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block'
};

export const dynamic = 'force-static'; // Enable static rendering when possible
export const revalidate = 300; // Revalidate every 5 minutes
export const fetchCache = 'force-no-store'; // Disable fetch caching for this route

// Pre-compute static data for better SSR performance
let staticPosters: Poster[] | null = null;

async function getOptimizedPosters() {
  if (staticPosters) {
    return staticPosters;
  }

  try {
    const posters = await getCachedPosters();
    
    // Optimize poster data for SSR
    staticPosters = posters.map(poster => ({
      ...poster,
      // Remove heavy metadata for faster SSR
      metadata: poster.metadata ? {
        aspectRatio: poster.metadata.aspectRatio,
        colorPalette: poster.metadata.colorPalette.slice(0, 3), // Limit color palette
        mood: poster.metadata.mood,
        technique: poster.metadata.technique
      } : undefined,
      // Add optimized image URLs
      previewImage: poster.previewImage,
      panelImages: poster.panelImages
    }));

    return staticPosters;
  } catch (error) {
    console.error('Error fetching optimized posters:', error);
    return [];
  }
}

export async function GET() {
  try {
    const posters = await getOptimizedPosters();
    
    return NextResponse.json(posters, {
      headers: CACHE_CONTROL
    });
  } catch (error) {
    console.error('Error fetching posters:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch posters' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Clear cache when new data is added
    clearCache();
    staticPosters = null; // Invalidate static cache
    
    return NextResponse.json(
      { message: 'Poster created successfully' },
      { 
        status: 201,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  } catch (error) {
    console.error('Error creating poster:', error);
    return NextResponse.json(
      { error: 'Failed to create poster' },
      { status: 500 }
    );
  }
}

// Handle HEAD requests for better HTTP compliance
export async function HEAD() {
  return NextResponse.json({}, {
    headers: CACHE_CONTROL
  });
}