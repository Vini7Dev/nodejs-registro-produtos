import { Request, Response } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';

class CategoriesController {
  // Cadatro de categoria
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados da requisição
    const { name, description } = request.body;

    // Instanciando e executando o serviço para o cadastro da categoria
    const createCategoryService = new CreateCategoryService();

    const createdCategory = await createCategoryService.execute({
      name,
      description,
    });

    // Retornando a categoria cadastrada
    return response.status(201).json(createdCategory);
  }
}

export default CategoriesController;
