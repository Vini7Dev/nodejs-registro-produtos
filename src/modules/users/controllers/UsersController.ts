import { Request, Response } from 'express';

class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        return response.status(201).json('Create User');
    }
}

export default UsersController;
