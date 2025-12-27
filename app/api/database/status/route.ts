// Server-side database status API with caching
import { NextResponse } from 'next/server';

// Cache for database status
let dbStatusCache: {
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
    if (dbStatusCache && (now - dbStatusCache.timestamp) < CACHE_TTL) {
      return NextResponse.json(dbStatusCache);
    }

    let result;

    // Try Turso first (browser-compatible)
    try {
      const { initializeDatabase: initTurso } = await import('@/lib/db/turso');
      await initTurso();
      result = {
        status: 'connected',
        type: 'turso',
        message: 'Connected to Turso database'
      };
    } catch (tursoError) {
      console.log('Turso not available, trying SQLite');
      
      // Try SQLite (server-only)
      try {
        const { initializeDatabase: initSqlite } = await import('@/lib/db/sqlite');
        initSqlite();
        result = {
          status: 'connected',
          type: 'sqlite',
          message: 'Connected to SQLite database'
        };
      } catch (sqliteError) {
        console.error('SQLite failed:', sqliteError);
        result = {
          status: 'error',
          type: 'none',
          message: 'Both databases failed to connect'
        };
      }
    }

    // Cache the result
    dbStatusCache = {
      ...result,
      timestamp: now
    };

    return NextResponse.json(dbStatusCache, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120'
      }
    });
  } catch (error) {
    console.error('Database status check failed:', error);
    return NextResponse.json({
      status: 'error',
      type: 'unknown',
      message: 'Database status check failed'
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}