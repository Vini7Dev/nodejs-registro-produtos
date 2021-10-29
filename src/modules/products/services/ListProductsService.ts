import { classToClass } from 'class-transformer';

import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

// Serviço para a listagem dos produtos
class ListProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    // Instanciando o repositório dos produtos
    this.productsRepository = new ProductsRepository();
  }

  public async execute(): Promise<Product[]> {
    // Buscando os produtos salvos no banco de dados
    const productsList = await this.productsRepository.list();

    // Adicionando a URL de acesso à cada imagem no retorno dos produtos e removendo a senha dos usuários que cadastraram cada um dos produtos
    const productsListClassTransformed = classToClass(productsList);

    // Retornando a listagem dos produtos
    return productsListClassTransformed;
  }
}

export default ListProductsService;
