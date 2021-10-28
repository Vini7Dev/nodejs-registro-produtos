import { getRepository, Repository } from 'typeorm';
import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';

import Category from '../entities/Category';

class CategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const categoryFound = await this.repository.findOne(id);

    return categoryFound;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const categoryFound = await this.repository.findOne({ name });

    return categoryFound;
  }

  public async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const createdCategory = this.repository.create({
      name,
      description,
    })

    await this.repository.save(createdCategory);

    return createdCategory;
  }
}

export default CategoriesRepository;
