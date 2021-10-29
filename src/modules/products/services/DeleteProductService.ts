import AppError from '../../../shared/errors/AppError';
import ProductImagesRepository from '../typeorm/repositories/ProductImagesRepository';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import deleteFilesArrayFromTmp from '../../../utils/deleteFilesArrayFromTmp';

class DeleteProductService {
  private productsRepository: ProductsRepository;

  private productImagesRepository: ProductImagesRepository;
  
  constructor() {
    this.productsRepository = new ProductsRepository();
    this.productImagesRepository = new ProductImagesRepository();
  }

  public async execute(id: string): Promise<void> {
    const productToDelete = await this.productsRepository.findById(id);

    if(!productToDelete) {
      throw new AppError('Product not found', 404);
    }

    const productImagesList = await this.productImagesRepository.findByProductId(id);

    const filesName = productImagesList.map(productImage => productImage.file_name);

    await deleteFilesArrayFromTmp(filesName);

    await this.productsRepository.delete(id);
  }
}

export default DeleteProductService;
