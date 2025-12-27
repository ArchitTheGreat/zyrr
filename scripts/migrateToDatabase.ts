#!/usr/bin/env tsx

import { migrateToDatabase } from '../lib/utils/database';

async function main() {
  try {
    console.log('🚀 Starting database migration...');
    const count = await migrateToDatabase();
    console.log(`✅ Migration completed! ${count} posters migrated to database.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

main();