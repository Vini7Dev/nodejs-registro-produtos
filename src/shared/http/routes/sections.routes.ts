import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SectionsController from '../../../modules/users/controllers/SectionsController';

const sectionsController = new SectionsController();

const sectionsRoutes = Router();

sectionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  sectionsController.create,
);

export default sectionsRoutes;
