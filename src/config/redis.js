import Redis from 'ioredis';
import {REDIS_HOST,REDIS_PORT} from './server.js';

const redisConnection = new Redis({
  host: REDIS_HOST || '127.0.0.1',
  port: Number(REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisConnection.on('connect', () => {
  console.log('Connected to Redis');
});

redisConnection.on('ready', () => {
  console.log('Redis is ready');
});

redisConnection.on('error', (err) => {
  console.error('Redis error:', err.message);
});

export default redisConnection;
