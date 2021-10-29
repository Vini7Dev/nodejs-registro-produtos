import { getRepository, Repository } from 'typeorm';

import Product from '../entities/Product';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';
import IProductsSearchFilter from '../../dtos/IProductsSearchFilter';

class ProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    // Instanciando o repositório dos produtos
    this.repository = getRepository(Product);
  }

  // Buscando um produto pelo seu id
  public async findById(id: string): Promise<Product> {
    const productsList = await this.repository.findOne(id, {
      relations: ['user', 'category', 'product_images'],
    });

    return productsList;
  }

  // Listando os produtos
  public async list({
    product_name,
    min_price,
    max_price,
    category_name,
  }: IProductsSearchFilter): Promise<Product[]> {
    // Iniciando a querry de busca com as junções nas tabelas
    const productsListQuerryBuilder = this.repository.createQueryBuilder('product')
      .innerJoinAndSelect('product.user', 'user')
      .innerJoinAndSelect('product.category', 'category')
      .innerJoinAndSelect('product.product_images', 'product_images');

    // Caso seja informado o filtro por nome do produto, aplica-lo na querry
    if(product_name) {
      productsListQuerryBuilder.andWhere(`product.name ILIKE '%${product_name}%'`);
    }

    // Caso seja informado o filtro por preço mínimo do produto, aplica-lo na querry
    if(min_price) {
      productsListQuerryBuilder.andWhere('product.price >= :min_price', { min_price });
    }

    // Caso seja informado o filtro por preço máximo do produto, aplica-lo na querry
    if(max_price) {
      productsListQuerryBuilder.andWhere('product.price <= :max_price', { max_price });
    }
    
    // Caso seja informado o filtro por nome da categoria, aplica-lo na querry
    if(category_name) {
      productsListQuerryBuilder.andWhere(`category.name ILIKE '%${category_name}%'`);
    }

    // Buscando e retornando os produtos filtrados (caso haja filtro)
    const productsList = productsListQuerryBuilder.getMany();

    return productsList;
  }

  // Cadastrando um novo produto
  public async create({
    name,
    description,
    price,
    category_id,
    user_id,
  }: ICreateProductDTO): Promise<Product> {
    const createdProduct = this.repository.create({
      name,
      description,
      price,
      category_id,
      user_id,
    });

    await this.repository.save(createdProduct);

    return createdProduct;
  }

  // Apagando um produto
  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ProductsRepository;
