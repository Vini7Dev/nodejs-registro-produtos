import 'express-async-errors';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import '../typeorm';
import routes from './routes';
import uploadConfig from '../../config/uploadConfig';
import AppError from '../errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.tmpFolder));

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.status).json({ error: error.message });
  } else {
    console.log(error);

    return response.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(3333, () => {
  console.log(`===> Server Started on PORT 3333 <===`);
});
