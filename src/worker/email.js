import { Worker } from 'bullmq'

import redisConnection from '../config/redis.js';
import {sendMail} from '../utils/sendMail.js';



export default async function emailWorker(name) {


    new Worker(name, async (job) => {


         try {
                console.log('Inside the Worker function');
                console.log(job.data);
                if (job.name === 'emailJob') {
                    await sendMail(job.data.to, job.data.subject, job.data.html);
                } else {
                    console.warn(`No handler defined for job: ${job.name}`);
                }
            } catch (err) {
                console.error('Error processing job:', err);
                throw err;
            }

    },
        { connection: redisConnection }
    );


}