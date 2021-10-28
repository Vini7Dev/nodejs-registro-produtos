import AppError from '../../../shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import UsersRepository from '../../users/typeorm/repositories/UsersRepository';
import CategoriesRepository from '../typeorm/repositories/CategoriesRepository';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  category_id: string;
  user_id: string;
}

class CreateProductsService {
  private productsRepository: ProductsRepository;

  private categoriesRepository: CategoriesRepository;
  
  private usersRepository: UsersRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
    this.categoriesRepository = new CategoriesRepository();
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    name,
    description,
    price,
    category_id,
    user_id,
  }: IRequest): Promise<Product> {
    const userFound = await this.usersRepository.findById(user_id);

    if(!userFound) {
      throw new AppError('User not found.', 404);
    }

    const categoryFound = await this.categoriesRepository.findById(category_id);

    if(!categoryFound) {
      throw new AppError('Category not found.', 404);
    }

    const createdProduct = await this.productsRepository.create({
      name,
      description,
      price,
      category_id,
      user_id,
    });

    return createdProduct;
  }
}

export default CreateProductsService;
