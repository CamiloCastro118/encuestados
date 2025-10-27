import pool from '../db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function init() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

  // Crear tabla de usuarios
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

  // Crear tabla de encuestas
    await client.query(`
      CREATE TABLE IF NOT EXISTS encuestas (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descripcion TEXT,
        "userId" INTEGER REFERENCES users(id) ON DELETE SET NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

  // Asegurar que exista un usuario admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@encuestas.com';
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    const res = await client.query('SELECT id FROM users WHERE username = $1 OR email = $2', [adminUser, adminEmail]);
    if (res.rowCount === 0) {
      const hash = await bcrypt.hash(adminPass, 10);
      await client.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)',
        [adminUser, adminEmail, hash, 'admin']
      );
      console.log('Admin user created:', adminUser);
    } else {
      console.log('Admin already exists');
    }

    await client.query('COMMIT');
    console.log('DB initialized successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error initializing DB:', err);
  } finally {
    client.release();
    process.exit(0);
  }
}

init();
