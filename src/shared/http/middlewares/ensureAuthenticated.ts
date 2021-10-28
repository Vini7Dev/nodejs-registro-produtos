import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../config/authConfig';
import AppError from '../../errors/AppError';

interface ITokenPayload {
  sub: string;
}

const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
  const bearerToken = request.headers.authorization;

  if(!bearerToken) {
    throw new AppError('Token not found', 401);
  }

  const [, token] = bearerToken.split(' ');

  try {
    const { secret } = authConfig.jwt;

    const { sub: user_id } = verify(token, secret) as ITokenPayload;

    request.user_id = user_id;

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}

export default ensureAuthenticated;
