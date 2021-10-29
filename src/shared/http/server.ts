import 'express-async-errors';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import '../typeorm';
import routes from './routes';
import uploadConfig from '../../config/uploadConfig';
import AppError from '../errors/AppError';

// Instanciando o servidor
const app = express();

// Adicionando o cors
app.use(cors());

// Definindo que as requisições vão trabalhar com o JSON
app.use(express.json());

// Definindo a rota /files para acessar as imagens presentes no localstorage 
app.use('/files', express.static(uploadConfig.tmpFolder));

// Adicionando as rotas da aplicação no servidor
app.use(routes);

// Tratando erros de validação
app.use(errors());

// Tratativa dos demais erros
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    // Tratando erros conhecidos
    return response.status(error.status).json({ error: error.message });
  } else {
    // Tratando erros internos do servidor
    return response.status(500).json({ error: 'Internal server error.' });
  }
});

// Iniciando o servidor na porta 3333
app.listen(3333, () => {
  console.log(`===> Server Started on PORT 3333 <===`);
});
