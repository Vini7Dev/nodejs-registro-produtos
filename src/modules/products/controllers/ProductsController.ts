import { Request, Response } from 'express';

import CreateProductsService from '../services/CreateProductsService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductsService from '../services/ListProductsService';

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductsService();

    const productsList = await listProductsService.execute();

    return response.json(productsList);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const { name, description, price, category_id } = request.body;

    const createProductsService = new CreateProductsService();

    const createdProduct = await createProductsService.execute({
      name,
      description,
      price,
      category_id,
      user_id,
    });

    return response.status(201).json(createdProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute(id);

    return response.status(204).send();
  }
}

export default ProductsController;
