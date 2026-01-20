import express from 'express';
import dotenv from 'dotenv';
import { PORT } from './config/server.js';
import ApiRoutes from './routes/index.js';
import { errorMiddleware } from "./middleware/errorHandler.js";
import emailWorker from './worker/email.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/home', (req, res) => {
    res.send('Auth Service is running');
});

app.use('/api', ApiRoutes);

emailWorker('emailQueue');

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
});
