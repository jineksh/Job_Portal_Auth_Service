import { Queue } from 'bullmq';

import  redisConnection  from '../config/redis.js';


export default new Queue('emailQueue',{connection: redisConnection});