import pkg from 'pg';
const { Pool } = pkg;
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from './src/lib/database.types';

export const pool = new Pool({
    database: import.meta.env.VITE_DB_DATABASE,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASSWORD,
    host: 'db',
    port: 5432,
    max: 10,
});

const dialect = new PostgresDialect({
    pool,
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
    dialect,
    log: ['error', 'query'],
});
