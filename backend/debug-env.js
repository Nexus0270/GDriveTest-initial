const path = require('path');
const dotenv = require('dotenv');

console.log('Current directory:', __dirname);
console.log('Looking for .env file in:', path.resolve(__dirname, '.env'));

// Try to load .env manually
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });

if (result.error) {
  console.log('❌ Error loading .env:', result.error);
} else {
  console.log('✅ .env file loaded successfully');
  console.log('Parsed environment variables:', result.parsed);
}

console.log('GOOGLE_CLIENT_ID from process.env:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET from process.env:', process.env.GOOGLE_CLIENT_SECRET);