import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFound = await this.repository.findOne({ email });

    return userFound;
  }

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
