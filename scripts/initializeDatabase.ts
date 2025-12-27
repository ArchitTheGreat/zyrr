#!/usr/bin/env tsx

import { initializeDatabase } from '../lib/utils/database';

async function main() {
  try {
    console.log('🔧 Initializing database...');
    const db = await initializeDatabase();
    console.log(`✅ Database initialized successfully! Using ${db.type} database.`);
    
    // Test connection
    const posters = await db.getPosters();
    console.log(`📊 Found ${posters.length} posters in database.`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

main();