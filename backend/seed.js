import { connect } from 'mongoose';
import { join } from 'path';
import Node from './models/node';

// Manually point to the .env file relative to this script
require('dotenv').config({ path: join(__currentDir, '../.env') }); 
// OR if the .env is inside backend:
require('dotenv').config({ path: join(__dirname, '.env') });

const SEED_COUNT = 1000;

async function seedDatabase() {
  const uri = process.env.MONGO_URI;
  
  if (!uri) {
    console.error("❌ ERROR: MONGO_URI is undefined.");
    console.log("Checking path:", join(__dirname, '.env'));
    process.exit(1);
  }

  try {
    await connect(uri);
    console.log("🚀 Connected to MongoDB for seeding...");
    
    // ... rest of your seeding logic ...
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}