import CategoriesController from '../../../modules/products/controllers/CategoriesController';
import { Router } from 'express';

const categoriesController = new CategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.post('/', categoriesController.create);

export default categoriesRoutes;
