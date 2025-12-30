import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {PORT} from './config/server.js';
import ApiRoutes from './routes/index.js';
import { errorMiddleware } from "./middleware/errorHandler.js";
import emailWorker from './worker/email.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use('/api',ApiRoutes);
emailWorker('emailQueue');

app.use(errorMiddleware);


app.listen(PORT,()=>{
    console.log(`Auth Service is running on port ${PORT}`);
})