import { Request, Response } from 'express';

import CreateProductsService from '../services/CreateProductsService';

class ProductsController {
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
}

export default ProductsController;
