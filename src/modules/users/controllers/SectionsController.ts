import { Request, Response } from 'express';
import CreateSectionService from '../services/CreateSectionService';

class SectionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSectionService = new CreateSectionService();

    const userToken = await createSectionService.execute({
      email,
      password,
    })

    return response.status(201).json(userToken);
  }
}

export default SectionsController;
