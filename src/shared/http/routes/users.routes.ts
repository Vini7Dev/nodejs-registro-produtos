import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../../../modules/users/controllers/UsersController';

// Instanciando o controlador dos usuário
const usersController = new UsersController();

// Instanciando o objeto de rotas dos usuários
const usersRoutes = Router();

// Rota pra o cadastro de um novo usuário
usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  usersController.create,
);

export default usersRoutes;
