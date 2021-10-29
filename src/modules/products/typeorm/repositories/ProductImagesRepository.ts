import { getRepository, Repository } from 'typeorm';
import ICreateProductImageDTO from '../../dtos/ICreateProductImageDTO';

import ProductImage from '../entities/ProductImage';

class ProductImagesRepository {
  private repository: Repository<ProductImage>

  constructor() {
    this.repository = getRepository(ProductImage);
  }

  public async findByProductId(product_id: string): Promise<ProductImage[]> {
    const productImagesList = await this.repository.find({ product_id });

    return productImagesList;
  }

  public async create({ file_name, product_id }: ICreateProductImageDTO): Promise<ProductImage> {
    const createdProductImage = this.repository.create({
      file_name,
      product_id,
    });

    await this.repository.save(createdProductImage);

    return createdProductImage;
  }
}

export default ProductImagesRepository;
