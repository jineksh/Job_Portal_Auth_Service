import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 3000;
export const JWT_KEY = process.env.JWT_KEY
export const REDIS_HOST = process.env.REDIS_HOST
export const REDIS_PORT = process.env.REDIS_PORT
export const GMAIL_PASS = process.env.GMAIL_PASS
export const GMAIL_USER = process.env.GMAIL_USER

