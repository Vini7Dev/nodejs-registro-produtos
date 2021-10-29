import { hash } from 'bcrypt';
import { classToClass } from 'class-transformer';

import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

// Serviço para cadastro de usuário
class CreateUserService {
  private usersRepository: UsersRepository;

  constructor() {
    // Instanciando o repositório dos usuários
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    // Verificando se já existe um usuário cadastrado com o email informado
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    // Caso não, impedir a ação lançando um erro
    if(userWithSameEmail) {
      throw new AppError('This email is already in use.');
    }

    // Criptografando a senha para salvar no banco de dados
    const passwordHash = await hash(password, 8);

    // Cadastrando o novo usuário
    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    // Removendo a senha do usuário no retorno
    const userWithoutPassword = classToClass(createdUser);

    // Retornando os dados do usuário cadastrado
    return userWithoutPassword;
  }
}

export default CreateUserService;
