// Turso database client for Zyrr Gallery
import { createClient } from '@libsql/client';

// Initialize Turso client
const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || ''
});

// Database operations for posters
export async function getPosters() {
  try {
    const result = await turso.execute({
      sql: 'SELECT * FROM posters ORDER BY created_at DESC',
      args: []
    });
    return result.rows as any[];
  } catch (error) {
    console.error('Error fetching posters from Turso:', error);
    throw error;
  }
}

export async function getPosterBySlug(slug: string) {
  try {
    const result = await turso.execute({
      sql: 'SELECT * FROM posters WHERE slug = ? LIMIT 1',
      args: [slug]
    });
    return result.rows[0] as any;
  } catch (error) {
    console.error('Error fetching poster by slug:', error);
    throw error;
  }
}

export async function createPoster(poster: any) {
  try {
    const result = await turso.execute({
      sql: `
        INSERT INTO posters (
          id, slug, title, subtitle, description, previewImage, leftImage, centerImage, rightImage,
          price, width, height, unit, medium, year, edition, availability, aspectRatio, 
          colorPalette, mood, technique
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      args: [
        poster.id, poster.slug, poster.title, poster.subtitle, poster.description,
        poster.previewImage, poster.leftImage, poster.centerImage, poster.rightImage,
        poster.price, poster.width, poster.height, poster.unit, poster.medium,
        poster.year, poster.edition, poster.availability, poster.aspectRatio,
        JSON.stringify(poster.colorPalette), poster.mood, poster.technique
      ]
    });
    return result;
  } catch (error) {
    console.error('Error creating poster:', error);
    throw error;
  }
}

// Initialize database with schema
export async function initializeDatabase() {
  try {
    const schema = await import('fs/promises');
    const schemaContent = await schema.readFile('./lib/db/schema.sql', 'utf-8');
    await turso.execute(schemaContent);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}