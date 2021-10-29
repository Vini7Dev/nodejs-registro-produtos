import { classToClass } from 'class-transformer';

import AppError from '../../../shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  product_name?: string;
  min_price?: number;
  max_price?: number;
  category_name?: string;
}

// Serviço para a listagem dos produtos
class ListProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    // Instanciando o repositório dos produtos
    this.productsRepository = new ProductsRepository();
  }

  public async execute({
    product_name,
    min_price,
    max_price,
    category_name,
  }: IRequest): Promise<Product[]> {
    // Caso tenha aplicado os filtros por mínimo e máximo de preço, certificar que o valor mínimo não é superior ao máximo
    if(min_price && max_price && Number(min_price) > Number(max_price)) {
      throw new AppError('The min_price cannot be higher than max_price.');
    }

    // Buscando os produtos salvos no banco de dados
    const productsList = await this.productsRepository.list({
      product_name,
      min_price,
      max_price,
      category_name,
    });

    // Adicionando a URL de acesso à cada imagem no retorno dos produtos e removendo a senha dos usuários que cadastraram cada um dos produtos
    const productsListClassTransformed = classToClass(productsList);

    // Retornando a listagem dos produtos
    return productsListClassTransformed;
  }
}

export default ListProductsService;
