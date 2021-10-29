import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CategoriesController from '../../../modules/products/controllers/CategoriesController';

// Instanciando o controlador das categorias
const categoriesController = new CategoriesController();

// Instanciando o objeto de rotas das categorias
const categoriesRoutes = Router();

// Implementando o middleware em todas as rotas para garantir que o usuário está autenticado 
categoriesRoutes.use(ensureAuthenticated);

// Rota para cadastrar uma nova categoria
categoriesRoutes.post(
  '/',
  // Validando os dados recebidos
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    }
  }),
  categoriesController.create,
);

export default categoriesRoutes;
