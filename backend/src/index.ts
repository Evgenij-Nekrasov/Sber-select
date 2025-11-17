import express from 'express';
import cors from 'cors';

import { initializeDatabase } from './db/lowdb';
import optionsRouter from './routes/options';
import selectedRouter from './routes/selected';
import { errorMiddleware } from './middleware/errorMiddleware';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
})

const app = express();
const PORT = process.env.PORT || 8000;

initializeDatabase();

app.use(limiter)

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(express.json());

app.use('/options/for/select', optionsRouter);
app.use('/selected/option', selectedRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
