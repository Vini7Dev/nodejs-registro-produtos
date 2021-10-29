import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../config/authConfig';
import AppError from '../../errors/AppError';

interface ITokenPayload {
  sub: string;
}

// Middleware para garantir que o usuário está autenticado antes de acessar alguma funcionalidade da rota
const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
  // Recuperando o token de autenticação presente no cabeçalho da requisição
  const bearerToken = request.headers.authorization;

  // Caso o token não foi informado, impedir a ação lançando um erro
  if(!bearerToken) {
    throw new AppError('Token not found', 401);
  }

  // Selecionando o token sem o "Bearer"
  const [, token] = bearerToken.split(' ');

  // Verificando se o token é válido
  try {
    // Recuperando a chave para validar o token
    const { secret } = authConfig.jwt;

    // Verificando se o token é válido, caso contrário é lançado um erro
    const { sub: user_id } = verify(token, secret) as ITokenPayload;

    // Caso seja válido, salvar o id do usuário autenticado dentro da requisição
    request.user = {
      id: user_id,
    };

    // Continuando a execução da rota
    return next();
  } catch {
    // Caso o token informado não for válido, lançar um erro
    throw new AppError('Invalid token', 401);
  }
}

export default ensureAuthenticated;
