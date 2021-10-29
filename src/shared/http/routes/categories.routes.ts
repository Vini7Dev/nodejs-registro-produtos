import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CategoriesController from '../../../modules/products/controllers/CategoriesController';

const categoriesController = new CategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    }
  }),
  categoriesController.create,
);

export default categoriesRoutes;
