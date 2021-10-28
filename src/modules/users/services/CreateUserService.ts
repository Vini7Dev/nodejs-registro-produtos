import { hash } from 'bcrypt';

import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if(userWithSameEmail) {
      throw new AppError('This email is already in use.');
    }

    const passwordHash = await hash(password, 8);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    delete createdUser.password;

    return createdUser;
  }
}

export default CreateUserService;
