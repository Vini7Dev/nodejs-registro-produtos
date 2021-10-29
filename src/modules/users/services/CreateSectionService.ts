import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { classToClass } from 'class-transformer';

import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/authConfig';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

// Serviço para inicar uma nova sessão
class CreateSectionService {
  private usersRepository: UsersRepository;

  constructor() {
    // Instanciando o repositório dos usuários
    this.usersRepository = new UsersRepository();
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verificando se o email informado está cadastrado no sistema
    const user = await this.usersRepository.findByEmail(email);

    // Caso não, impedir a ação lançando um erro
    if (!user) {
      throw new AppError('Invalid credentials.', 401);
    }

    // Verificando se a senha informada é a mesma da que está salva com criptografia 
    const passwordMatch = await compare(password, user.password);

    // Caso não, impedir a ação lançando um erro
    if (!passwordMatch) {
      throw new AppError('Invalid credentials.', 401);
    }

    // Recuperando os dados de configuração para o token JWT
    const { secret, expiresIn } = authConfig.jwt;

    // Gerando um novo token
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // Removendo a senha do usuário no retorno
    const userWithoutPassword = classToClass(user);

    // Retornando os dados do usuário e o token para autenticação
    return { user: userWithoutPassword, token };
  }
}

export default CreateSectionService;
