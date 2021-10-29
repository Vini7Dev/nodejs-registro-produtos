import { getRepository, Repository } from 'typeorm';
import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';

import Category from '../entities/Category';

class CategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    // Instanciando o repositório das categorias
    this.repository = getRepository(Category);
  }

  // Buscando uma categoria pelo seu id
  public async findById(id: string): Promise<Category | undefined> {
    const categoryFound = await this.repository.findOne(id);

    return categoryFound;
  }

  // Buscando uma categoria pelo o seu nome
  public async findByName(name: string): Promise<Category | undefined> {
    const categoryFound = await this.repository.findOne({ name });

    return categoryFound;
  }

  // Cadastrando uma nova categoria
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
