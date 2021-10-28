import { Request, Response } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService();

    const createdCategory = await createCategoryService.execute({
      name,
      description,
    });

    return response.status(201).json(createdCategory);
  }
}

export default CategoriesController;
