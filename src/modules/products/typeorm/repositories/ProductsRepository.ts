import { getRepository, Repository } from 'typeorm';

import Product from '../entities/Product';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

class ProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  public async create({
    name,
    description,
    price,
    category_id,
  }: ICreateProductDTO): Promise<Product> {
    const createdProduct = this.repository.create({
      name,
      description,
      price,
      category_id,
    });

    await this.repository.save(createdProduct);

    return createdProduct;
  }
}

export default ProductsRepository;
