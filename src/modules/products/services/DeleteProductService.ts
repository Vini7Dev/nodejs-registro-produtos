import AppError from '../../../shared/errors/AppError';
import ProductImagesRepository from '../typeorm/repositories/ProductImagesRepository';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import deleteFilesArrayFromTmp from '../../../utils/deleteFilesArrayFromTmp';

// Serviço para apagar um produto
class DeleteProductService {
  private productsRepository: ProductsRepository;

  private productImagesRepository: ProductImagesRepository;
  
  constructor() {
    // Instanciando o repositório dos produtos e das imagens dos produtos
    this.productsRepository = new ProductsRepository();
    this.productImagesRepository = new ProductImagesRepository();
  }

  public async execute(id: string): Promise<void> {
    // Verificando se o produto existe antes de deletar
    const productToDelete = await this.productsRepository.findById(id);

    // Caso não, bloquear a ação lançando um erro
    if(!productToDelete) {
      throw new AppError('Product not found', 404);
    }

    // Recuperando todas as imagens referentes a este produto
    const productImagesList = await this.productImagesRepository.findByProductId(id);

    // Selecionando o nome de cada imagem
    const filesName = productImagesList.map(productImage => productImage.file_name);

    // Apagando as imagens salvas no storage
    await deleteFilesArrayFromTmp(filesName);

    // Apagando o produto juntamente de suas imagens presentes no banco de dados 
    await this.productsRepository.delete(id);
  }
}

export default DeleteProductService;
