// JSON-only database status API
import { NextResponse } from 'next/server';

// Cache for status
let statusCache: {
  status: string;
  type: string;
  message: string;
  timestamp: number;
} | null = null;

const CACHE_TTL = 60000; // 1 minute cache

export async function GET() {
  try {
    // Check cache first
    const now = Date.now();
    if (statusCache && (now - statusCache.timestamp) < CACHE_TTL) {
      return NextResponse.json(statusCache);
    }

    // JSON-only status
    const result = {
      status: 'connected',
      type: 'json',
      message: 'Using JSON data source'
    };

    // Cache the result
    statusCache = {
      ...result,
      timestamp: now
    };

    return NextResponse.json(statusCache, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120'
      }
    });
  } catch (error) {
    console.error('Status check failed:', error);
    return NextResponse.json({
      status: 'error',
      type: 'none',
      message: 'Status check failed'
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}