import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProductsController from '../../../modules/products/controllers/ProductsController';
import uploadConfig from '../../../config/uploadConfig';

// Instanciando o controlador dos produtos
const productsController = new ProductsController();

// Recuperando o middleware para upload de arquivos
const uploadProductImages = multer(uploadConfig);

// Instanciando o objeto de rotas dos produtos
const productsRoutes = Router();

// Implementando o middleware em todas as rotas para garantir que o usuário está autenticado 
productsRoutes.use(ensureAuthenticated);

// Rota para listagem dos produtos
productsRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      product_name: Joi.string(),
      min_price: Joi.number().min(0),
      max_price: Joi.number().min(1),
      category_name: Joi.string(),
    },
  }),
  productsController.index,
);

// Rota para cadastro de um novo produto
productsRoutes.post(
  '/',
  // Tratando as imagens recebidas
  uploadProductImages.array('images'),
  // Validando os dados recebidos
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

// Rota para apagar um produto
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
