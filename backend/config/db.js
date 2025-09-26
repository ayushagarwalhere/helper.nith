import pg from 'pg';
import env from 'dotenv';

env.config();

const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT ,
});



export const connectDB = async () => {
    try {
        await db.connect();
        console.log("Database connected successfully");
        await db.query(`
          CREATE TABLE IF NOT EXISTS goths_details (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL,
            roll_number TEXT NOT NULL,
            branch TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);
    } catch (error) {
        console.error("Database connection failed", error);
        throw error;
    }
};

export default db;