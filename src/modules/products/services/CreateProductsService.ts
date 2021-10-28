import AppError from '../../../shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import ProductImage from '../typeorm/entities/ProductImage';
import UsersRepository from '../../users/typeorm/repositories/UsersRepository';
import CategoriesRepository from '../typeorm/repositories/CategoriesRepository';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import ProductImagesRepository from '../typeorm/repositories/ProductImagesRepository';
import deleteFilesArray from '../../../utils/deleteFilesArray';

interface IRequest {
  name: string;
  description: string;
  price: number;
  category_id: string;
  user_id: string;
  images_name: string[];
}

class CreateProductsService {
  private productsRepository: ProductsRepository;

  private productImagesRepository: ProductImagesRepository;

  private categoriesRepository: CategoriesRepository;
  
  private usersRepository: UsersRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
    this.productImagesRepository = new ProductImagesRepository();
    this.categoriesRepository = new CategoriesRepository();
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    name,
    description,
    price,
    images_name,
    category_id,
    user_id,
  }: IRequest): Promise<Product> {
    if(images_name.length < 1) {
      await deleteFilesArray(images_name);

      throw new AppError('You need to add at least 1 image.');
    } else if(images_name.length > 5) {
      await deleteFilesArray(images_name);
      
      throw new AppError('You are not allowed to add more than 5 images for each product.');
    }

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

    const imagesCreated: ProductImage[] = [];

    for(let i in images_name) {
      const createdImage = await this.productImagesRepository.create({
        file_name: images_name[i],
        product_id: createdProduct.id,
      });

      imagesCreated.push(createdImage);
    }

    createdProduct.product_images = imagesCreated;

    return createdProduct;
  }
}

export default CreateProductsService;
