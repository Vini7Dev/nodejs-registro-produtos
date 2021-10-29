import { Request, Response } from 'express';

import CreateProductsService from '../services/CreateProductsService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductsService from '../services/ListProductsService';

interface IFileProps {
  filename: string;
}

class ProductsController {
  // Listagem dos produtos cadastrados
  public async index(request: Request, response: Response): Promise<Response> {
    // Instanciando e executando o serviço para a listagem dos produtos
    const listProductsService = new ListProductsService();

    const productsList = await listProductsService.execute();

    // Retornando a listagem dos produtos
    return response.json(productsList);
  }

  // Cadastro de produtos
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados necessários para o cadastro do produto
    const { id: user_id } = request.user;
    const images = request.files as IFileProps[];
    const { name, description, price, category_id } = request.body;

    // Selecionando apenas o nome das imagens enviadas para a pasta "tmp"
    const images_name = images.map(file => file.filename);

    // Instanciando e executando o serviço para o cadastro do produto
    const createProductsService = new CreateProductsService();

    const createdProduct = await createProductsService.execute({
      name,
      description,
      price,
      category_id,
      user_id,
      images_name,
    });

    // Retornando o produto cadastrado
    return response.status(201).json(createdProduct);
  }

  // Apagando um produto
  public async delete(request: Request, response: Response): Promise<Response> {
    // Recuperando o id do produto a remover que está presente na rota
    const { id } = request.params;

    // Instanciando e executando o serviço para a remoção do produto
    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute(id);

    // Retornando uma resposta vaiza
    return response.status(204).send();
  }
}

export default ProductsController;
