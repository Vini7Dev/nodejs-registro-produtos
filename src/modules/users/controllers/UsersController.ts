import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		const createUserService = new CreateUserService();

		const userCreated = await createUserService.execute({
			name,
			email,
			password,
		});

		return response.status(201).json(userCreated);
	}
}

export default UsersController;
