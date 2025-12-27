// Database utility functions for Zyrr Gallery

// Cache for database connections and results
const dbCache = new Map();
const queryCache = new Map();

/**
 * Initialize the database based on environment variables with caching
 * @returns Database client and functions
 */
export async function initializeDatabase() {
  // Check cache first
  if (dbCache.has('database')) {
    return dbCache.get('database');
  }

  let db;
  
  // Check if Turso is configured
  if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    console.log('Initializing Turso database...');
    const { initializeDatabase: initTurso } = await import('@/lib/db/turso');
    await initTurso();
    db = {
      getPosters: (await import('@/lib/db/turso')).getPosters,
      getPosterBySlug: (await import('@/lib/db/turso')).getPosterBySlug,
      createPoster: (await import('@/lib/db/turso')).createPoster,
      type: 'turso' as const
    };
  } else {
    // Fall back to SQLite
    console.log('Initializing SQLite database...');
    const { initializeDatabase: initSqlite, getPosters, getPosterBySlug, createPoster } = await import('@/lib/db/sqlite');
    initSqlite();
    db = {
      getPosters,
      getPosterBySlug,
      createPoster,
      type: 'sqlite' as const
    };
  }

  // Cache the database instance
  dbCache.set('database', db);
  return db;
}

/**
 * Cached version of getPosters with TTL
 */
export async function getCachedPosters() {
  const cacheKey = 'posters';
  const cacheTTL = 5 * 60 * 1000; // 5 minutes
  
  const cached = queryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    return cached.data;
  }

  const db = await initializeDatabase();
  const posters = await db.getPosters();
  
  // Cache the result
  queryCache.set(cacheKey, {
    data: posters,
    timestamp: Date.now()
  });

  return posters;
}

/**
 * Cached version of getPosterBySlug with TTL
 */
export async function getCachedPosterBySlug(slug: string) {
  const cacheKey = `poster:${slug}`;
  const cacheTTL = 10 * 60 * 1000; // 10 minutes
  
  const cached = queryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    return cached.data;
  }

  const db = await initializeDatabase();
  const poster = await db.getPosterBySlug(slug);
  
  // Cache the result
  queryCache.set(cacheKey, {
    data: poster,
    timestamp: Date.now()
  });

  return poster;
}

/**
 * Clear all caches
 */
export function clearCache() {
  queryCache.clear();
}

/**
 * Seed the database with initial data
 */
export async function seedDatabase() {
  const db = await initializeDatabase();
  
  // Check if database already has data
  const existingPosters = await db.getPosters();
  if (existingPosters.length > 0) {
    console.log('Database already seeded with', existingPosters.length, 'posters');
    return;
  }

  console.log('Seeding database with initial posters...');
  
  // Import sample data
  const { posters } = await import('@/lib/posters');
  
  // Insert each poster
  for (const poster of posters) {
    try {
      await db.createPoster({
        ...poster,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error seeding poster', poster.id, ':', error);
    }
  }

  console.log('Database seeded successfully with', posters.length, 'posters');
}

/**
 * Migrate from static data to database
 */
export async function migrateToDatabase() {
  const db = await initializeDatabase();
  
  // Clear existing data
  if (db.type === 'sqlite') {
    const sqliteDb = (await import('better-sqlite3')).default;
    const dbPath = process.cwd() + '/gallery.db';
    const dbInstance = new sqliteDb(dbPath);
    dbInstance.exec('DELETE FROM posters');
    dbInstance.close();
  }
  
  // Import and insert all posters
  const { posters } = await import('@/lib/posters');
  
  for (const poster of posters) {
    await db.createPoster({
      ...poster,
      created_at: new Date().toISOString()
    });
  }

  return posters.length;
}