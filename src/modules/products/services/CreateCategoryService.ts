import CategoriesRepository from '../typeorm/repositories/CategoriesRepository';
import Category from '../typeorm/entities/Category';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  private categoriesRepository: CategoriesRepository;

  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  public async execute({ name, description }: IRequest): Promise<Category> {
    const categoryWithSameName = await this.categoriesRepository.findByName(name);

    if(categoryWithSameName) {
      throw new AppError('This category already exits');
    }

    const createdCategory = await this.categoriesRepository.create({
      name,
      description,
    });

    return createdCategory;
  }
}

export default CreateCategoryService;
