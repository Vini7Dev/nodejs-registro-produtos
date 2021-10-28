import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFinded = await this.repository.findOne({ email });

    return userFinded;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userCreated = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(userCreated);

    return userCreated;
  }
}

export default UsersRepository;
