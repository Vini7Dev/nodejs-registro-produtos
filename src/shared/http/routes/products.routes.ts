import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProductsController from '../../../modules/products/controllers/ProductsController';
import uploadConfig from '../../../config/uploadConfig';

const productsController = new ProductsController();

const uploadProductImages = multer(uploadConfig);

const productsRoutes = Router();

productsRoutes.use(ensureAuthenticated);

productsRoutes.get(
  '/',
  productsController.index,
);

productsRoutes.post(
  '/',
  uploadProductImages.array('images'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category_id: Joi.string().uuid().required(),
    },
  }),
  productsController.create,
);

productsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  productsController.delete,
);

export default productsRoutes;
