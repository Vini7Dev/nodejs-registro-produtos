import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import '../typeorm';
import routes from './routes';
import AppError from '../errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.status).json({ error: error.message });
  } else {
    return response.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(3333, () => {
  console.log(`===> Server Started on PORT 3333 <===`);
});
