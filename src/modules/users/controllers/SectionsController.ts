import { Request, Response } from 'express';

class SectionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.status(201).json('OK');
  }
}

export default SectionsController;
