import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initAzure() {
  const password = process.argv[2] || process.env.AZURE_DB_PASSWORD;

  if (!password) {
    console.error('Error: Please provide your Azure database password:');
    console.error('Usage: node scripts/initAzureDb.js <your_db_password>');
    process.exit(1);
  }

  const host = 'shopwise-db-gajanan.mysql.database.azure.com';
  const user = 'gps1627';

  console.log(`Connecting to Azure MySQL: ${host} as ${user}...`);

  try {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      port: 3306,
      ssl: { rejectUnauthorized: false },
      multipleStatements: true,
    });

    console.log('Connected to Azure MySQL successfully!');

    // Read schema.sql
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    console.log('Executing schema.sql...');
    await connection.query(schemaSql);
    console.log('Schema created successfully!');

    // Read seed.sql
    const seedPath = path.join(__dirname, '../db/seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    console.log('Executing seed.sql (inserting users, 30 products, and reviews)...');
    await connection.query(seedSql);
    console.log('Seed data inserted successfully!');

    // Verify
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM shopwise.products');
    console.log(`Verification: Found ${rows[0].count} products in the Azure database.`);

    await connection.end();
    console.log('Database initialization complete!');
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    process.exit(1);
  }
}

initAzure();
