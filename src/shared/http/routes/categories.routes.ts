import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CategoriesController from '../../../modules/products/controllers/CategoriesController';

const categoriesController = new CategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  categoriesController.create
);

export default categoriesRoutes;
