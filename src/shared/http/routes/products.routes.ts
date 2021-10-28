import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProductsController from '../../../modules/products/controllers/ProductsController';
import uploadConfig from '../../../config/uploadConfig';

const productsController = new ProductsController();

const uploadProductImages = multer(uploadConfig);

const productsRoutes = Router();

productsRoutes.get(
  '/',
  ensureAuthenticated,
  productsController.index,
);

productsRoutes.post(
  '/',
  ensureAuthenticated,
  uploadProductImages.array('images'),
  productsController.create,
);

productsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  productsController.delete,
);

export default productsRoutes;
