import crypto from 'crypto';

/**
 * Generate encryption keys for .env file
 * Run with: npm run generate-keys
 */
const generateKeys = (): void => {
  console.log('\n=== Encryption Keys for .env ===\n');
  
  console.log('# Hash Salt (16 bytes)');
  console.log(`HASH_SALT=${crypto.randomBytes(16).toString('hex')}\n`);
  
  console.log('# Encryption Key (32 bytes for AES-256)');
  console.log(`ENCRYPTION_KEY=${crypto.randomBytes(32).toString('hex')}\n`);
  
  console.log('# Encryption IV (16 bytes)');
  console.log(`ENCRYPTION_IV=${crypto.randomBytes(16).toString('hex')}\n`);
  
  console.log('# JWT Secret (32 bytes)');
  console.log(`JWT_SECRET=${crypto.randomBytes(32).toString('hex')}\n`);
  
  console.log('⚠️  Copy these to your .env file');
  console.log('⚠️  Never commit these keys to Git\n');
};

generateKeys();