import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    // Instanciando o repositório dos usuários
    this.repository = getRepository(User);
  }

  // Buscando um usuário pelo seu id
  public async findById(id: string): Promise<User | undefined> {
    const userFound = await this.repository.findOne(id);

    return userFound;
  }

  // Buscando um usuário pelo seu email
  public async findByEmail(email: string): Promise<User | undefined> {
    const userFound = await this.repository.findOne({ email });

    return userFound;
  }

  // Cadastrando um novo usuário
  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const createdUser = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(createdUser);

    return createdUser;
  }
}

export default UsersRepository;
