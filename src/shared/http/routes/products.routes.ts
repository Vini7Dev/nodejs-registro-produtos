import ProductsController from '../../../modules/products/controllers/ProductsController';
import { Router } from 'express';

const productsController = new ProductsController();

const productsRoutes = Router();

productsRoutes.post('/', productsController.create);

export default productsRoutes;
