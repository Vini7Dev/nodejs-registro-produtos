import { Request, Response } from 'express';
import CreateSectionService from '../services/CreateSectionService';

class SectionsController {
  // Iniciando uma nova sessão no sistema
  public async create(request: Request, response: Response): Promise<Response> {
    // Recuprando os dados de autenticação presentes no corpo da requisição
    const { email, password } = request.body;

    // Instanciando e executando o serviço para iniciar a sessão
    const createSectionService = new CreateSectionService();

    const userToken = await createSectionService.execute({
      email,
      password,
    })

    // Retornando os dados do usuário e o token de autenticação
    return response.status(201).json(userToken);
  }
}

export default SectionsController;
