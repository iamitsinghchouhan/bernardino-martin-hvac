/**
 * Environment variable validation
 * Run on server startup
 * Fail FAST if any required env var is missing
 */

export function validateEnvironmentVariables() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'SESSION_SECRET',
    'ADMIN_PASSWORD',
    'NODE_ENV',
    'PORT',
  ];

  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    console.error('\n' + '='.repeat(60));
    console.error('❌ FATAL ERROR: Missing required environment variables');
    console.error('='.repeat(60));
    
    missingEnvVars.forEach(envVar => {
      console.error(`\n❌ ${envVar} is not set`);
      
      if (envVar === 'DATABASE_URL') {
        console.error('\nExpected format:');
        console.error('  postgresql://username:password@localhost:5432/database_name');
        console.error('\nExample:');
        console.error('  postgresql://hvac_user:MyPassword123@localhost:5432/bernardino_martin');
      }
    });

    console.error('\n' + '='.repeat(60));
    console.error('Fix:');
    console.error('1. SSH to production: ssh michael@160.153.176.159');
    console.error('2. Edit .env: nano ~/.env');
    console.error('3. Add missing variables');
    console.error('4. Save and run: source ~/.env');
    console.error('5. Restart: pm2 restart all --update-env');
    console.error('='.repeat(60) + '\n');
    
    process.exit(1);
  }

  console.log('✓ All required environment variables are present');
  return true;
}

const DB_CONNECT_RETRIES = 5;
const DB_CONNECT_DELAY_MS = 5000;

export async function validateDatabaseConnection(pool: any) {
  for (let attempt = 1; attempt <= DB_CONNECT_RETRIES; attempt++) {
    try {
      const client = await pool.connect();
      await client.query('SELECT 1');
      client.release();
      console.log('✓ Database connection verified');
      return true;
    } catch (error: any) {
      if (attempt < DB_CONNECT_RETRIES) {
        console.error(`⚠ Database connection attempt ${attempt}/${DB_CONNECT_RETRIES} failed: ${error.message}`);
        console.error(`  Retrying in ${DB_CONNECT_DELAY_MS / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, DB_CONNECT_DELAY_MS));
      } else {
        console.error('\n' + '='.repeat(60));
        console.error('❌ FATAL ERROR: Cannot connect to database after all retries');
        console.error('='.repeat(60));
        console.error(`\nError: ${error.message}`);
        console.error('\nPossible causes:');
        console.error('1. DATABASE_URL is incorrect');
        console.error('2. PostgreSQL is not running');
        console.error('3. Database credentials are wrong');
        console.error('4. Database server is unreachable');
        console.error('\nFix:');
        console.error('1. Verify DATABASE_URL: echo $DATABASE_URL');
        console.error('2. Check PostgreSQL: sudo systemctl status postgresql');
        console.error('3. Test connection: psql $DATABASE_URL -c "SELECT 1;"');
        console.error('='.repeat(60) + '\n');
        process.exit(1);
      }
    }
  }
}