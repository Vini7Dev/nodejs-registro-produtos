import CategoriesRepository from '../typeorm/repositories/CategoriesRepository';
import Category from '../typeorm/entities/Category';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

// Serviço para o cadastro de uma categoria
class CreateCategoryService {
  private categoriesRepository: CategoriesRepository;

  constructor() {
    // Instanciando o repositório das categorias
    this.categoriesRepository = new CategoriesRepository();
  }

  public async execute({ name, description }: IRequest): Promise<Category> {
    // Verificando se já existe uma categoria cadastrada com este nome
    const categoryWithSameName = await this.categoriesRepository.findByName(name);

    // Caso exista, lançar um error
    if(categoryWithSameName) {
      throw new AppError('This category already exits');
    }

    // Cadastrando a categoria e retornando os seus dados
    const createdCategory = await this.categoriesRepository.create({
      name,
      description,
    });

    return createdCategory;
  }
}

export default CreateCategoryService;
