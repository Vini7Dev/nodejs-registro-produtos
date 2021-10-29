import { getRepository, Repository } from 'typeorm';
import ICreateProductImageDTO from '../../dtos/ICreateProductImageDTO';

import ProductImage from '../entities/ProductImage';

class ProductImagesRepository {
  private repository: Repository<ProductImage>

  constructor() {
    // Instanciando o repositório das imagens de produtos
    this.repository = getRepository(ProductImage);
  }

  // Listando as imagens pelo id de um produto
  public async findByProductId(product_id: string): Promise<ProductImage[]> {
    const productImagesList = await this.repository.find({ product_id });

    return productImagesList;
  }

  // Cadastrando uma nova imagem
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
