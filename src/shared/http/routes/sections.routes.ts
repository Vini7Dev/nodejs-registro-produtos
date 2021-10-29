import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SectionsController from '../../../modules/users/controllers/SectionsController';

// Instanciando o controlador das sessões
const sectionsController = new SectionsController();

// Instanciando o objeto de rotas de sessão
const sectionsRoutes = Router();

// Rota para inicar uma nova sessão
sectionsRoutes.post(
  '/',
  // Validando os dados recebidos
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  sectionsController.create,
);

export default sectionsRoutes;
