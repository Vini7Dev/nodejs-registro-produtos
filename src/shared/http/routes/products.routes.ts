import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProductsController from '../../../modules/products/controllers/ProductsController';

const productsController = new ProductsController();

const productsRoutes = Router();

productsRoutes.post(
  '/',
  ensureAuthenticated,
  productsController.create
);

export default productsRoutes;
