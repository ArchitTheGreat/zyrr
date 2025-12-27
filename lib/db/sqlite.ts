// SQLite database client for Zyrr Gallery
import Database from 'better-sqlite3';
import path from 'path';

// Database file path
const dbPath = path.join(process.cwd(), 'gallery.db');
const db = new Database(dbPath);

// Initialize database with schema
export function initializeDatabase() {
  try {
    const schema = `
      CREATE TABLE IF NOT EXISTS posters (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        description TEXT,
        previewImage TEXT NOT NULL,
        leftImage TEXT NOT NULL,
        centerImage TEXT NOT NULL,
        rightImage TEXT NOT NULL,
        price REAL NOT NULL,
        width INTEGER,
        height INTEGER,
        unit TEXT,
        medium TEXT,
        year INTEGER,
        edition TEXT,
        availability TEXT NOT NULL,
        aspectRatio TEXT,
        colorPalette TEXT,
        mood TEXT,
        technique TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_posters_slug ON posters(slug);
      CREATE INDEX IF NOT EXISTS idx_posters_availability ON posters(availability);
    `;

    db.exec(schema);
    console.log('SQLite database initialized successfully');
  } catch (error) {
    console.error('Error initializing SQLite database:', error);
    throw error;
  }
}

// Database operations for posters
export function getPosters() {
  try {
    const stmt = db.prepare('SELECT * FROM posters ORDER BY created_at DESC');
    return stmt.all() as any[];
  } catch (error) {
    console.error('Error fetching posters from SQLite:', error);
    throw error;
  }
}

export function getPosterBySlug(slug: string) {
  try {
    const stmt = db.prepare('SELECT * FROM posters WHERE slug = ? LIMIT 1');
    return stmt.get(slug) as any;
  } catch (error) {
    console.error('Error fetching poster by slug:', error);
    throw error;
  }
}

export function createPoster(poster: any) {
  try {
    const stmt = db.prepare(`
      INSERT INTO posters (
        id, slug, title, subtitle, description, previewImage, leftImage, centerImage, rightImage,
        price, width, height, unit, medium, year, edition, availability, aspectRatio, 
        colorPalette, mood, technique
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);
    
    const info = stmt.run(
      poster.id, poster.slug, poster.title, poster.subtitle, poster.description,
      poster.previewImage, poster.leftImage, poster.centerImage, poster.rightImage,
      poster.price, poster.width, poster.height, poster.unit, poster.medium,
      poster.year, poster.edition, poster.availability, poster.aspectRatio,
      JSON.stringify(poster.colorPalette), poster.mood, poster.technique
    );
    
    return info;
  } catch (error) {
    console.error('Error creating poster:', error);
    throw error;
  }
}

// Close database connection
export function closeDatabase() {
  db.close();
}