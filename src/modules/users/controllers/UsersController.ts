import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class UsersController {
  // Cadastro de usuários
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuperando os dados para o cadastro presentes no corpo da requisição
		const { name, email, password } = request.body;

    // Instanciando e executando o serviço para o cadastro do usuário
		const createUserService = new CreateUserService();

		const userCreated = await createUserService.execute({
			name,
			email,
			password,
		});

    // Retornando os dados do usuário cadastrado
		return response.status(201).json(userCreated);
	}
}

export default UsersController;
