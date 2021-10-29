import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../../../modules/users/controllers/UsersController';

const usersController = new UsersController();

const usersRoutes = Router();

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
