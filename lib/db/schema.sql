-- SQLite/Turso database schema for Zyrr Gallery

-- Create posters table
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
  colorPalette TEXT, -- JSON array
  mood TEXT,
  technique TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for better performance on slug lookups
CREATE INDEX IF NOT EXISTS idx_posters_slug ON posters(slug);

-- Create an index for availability filtering
CREATE INDEX IF NOT EXISTS idx_posters_availability ON posters(availability);

-- Create a table for poster categories/tags (many-to-many relationship)
CREATE TABLE IF NOT EXISTS poster_categories (
  poster_id TEXT NOT NULL,
  category TEXT NOT NULL,
  PRIMARY KEY (poster_id, category),
  FOREIGN KEY (poster_id) REFERENCES posters(id) ON DELETE CASCADE
);

-- Create a table for artist information
CREATE TABLE IF NOT EXISTS artists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  website TEXT,
  instagram TEXT,
  twitter TEXT
);

-- Link posters to artists
ALTER TABLE posters ADD COLUMN artist_id TEXT REFERENCES artists(id);