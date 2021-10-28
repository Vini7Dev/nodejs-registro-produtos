import AppError from '../../../shared/errors/AppError';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

class DeleteProductService {
  private productsRepository: ProductsRepository;
  
  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(id: string): Promise<void> {
    const productToDelete = await this.productsRepository.findById(id);

    if(!productToDelete) {
      throw new AppError('Product not found', 404);
    }

    await this.productsRepository.delete(id);
  }
}

export default DeleteProductService;
