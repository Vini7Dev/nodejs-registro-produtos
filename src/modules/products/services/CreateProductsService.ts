import { classToClass } from 'class-transformer';

import AppError from '../../../shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import ProductImage from '../typeorm/entities/ProductImage';
import UsersRepository from '../../users/typeorm/repositories/UsersRepository';
import CategoriesRepository from '../typeorm/repositories/CategoriesRepository';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import ProductImagesRepository from '../typeorm/repositories/ProductImagesRepository';
import deleteFilesArrayFromTmp from '../../../utils/deleteFilesArrayFromTmp';

interface IRequest {
  name: string;
  description: string;
  price: number;
  category_id: string;
  user_id: string;
  images_name: string[];
}

// Serviço para o cadastro de um novo produto
class CreateProductsService {
  private productsRepository: ProductsRepository;

  private productImagesRepository: ProductImagesRepository;

  private categoriesRepository: CategoriesRepository;
  
  private usersRepository: UsersRepository;

  constructor() {
    // Instanciando os repositórios utilizados para o cadastro e para validar regras de negócio
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
    // Caso a quantidade de imagens foi menor que um ou maior que cinco, bloquear o cadastro lançando um erro
    if(images_name.length < 1) {
      throw new AppError('You need to add at least 1 image.');
    } else if(images_name.length > 5) {
      // Apagando as imagens pendentes no arquivo "tmp"
      await deleteFilesArrayFromTmp(images_name);
      
      throw new AppError('You are not allowed to add more than 5 images for each product.');
    }

    // Verificando se o id do usuário que deseja cadastrar o produto é válido
    const userFound = await this.usersRepository.findById(user_id);

    // Caso não seja, bloquear a ação lançando um erro
    if(!userFound) {
      throw new AppError('User not found.', 404);
    }

    // Verificando se a categoria existe salva no banco
    const categoryFound = await this.categoriesRepository.findById(category_id);

    // Caso não seja, bloquear a ação lançando um erro
    if(!categoryFound) {
      throw new AppError('Category not found.', 404);
    }

    // Cadastrando o produto
    const createdProduct = await this.productsRepository.create({
      name,
      description,
      price,
      category_id,
      user_id,
    });

    // Lista com as imagens do produto do produto em questão que foram cadastradas
    const imagesCreated: ProductImage[] = [];

    // Percorrendo a lista com o nome das imagens adicionadas
    for(let i in images_name) {
      // Cadastrando no banco de dados a referência da imagem para o produto
      const createdImage = await this.productImagesRepository.create({
        file_name: images_name[i],
        product_id: createdProduct.id,
      });

      // Adicionando a entidade da imagem cadastrada na lista das imagens do produto
      imagesCreated.push(createdImage);
    }

    // Atribuindo as listagem das imagens cadastadas no produto recém criado
    createdProduct.product_images = imagesCreated;

    // Adicionando a URL de acesso à cada imagem no retorno do produto criado
    const createdProductClassTransformed = classToClass(createdProduct)

    // Retornando os dados do produto e suas imagens
    return createdProductClassTransformed;
  }
}

export default CreateProductsService;
