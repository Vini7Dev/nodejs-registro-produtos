import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";

class ListProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(): Promise<Product[]> {
    const productsList = await this.productsRepository.list();

    return productsList;
  }
}

export default ListProductsService;
