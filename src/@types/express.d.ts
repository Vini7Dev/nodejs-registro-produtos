// Adicionando o objeto "user" nas tipagens da requisição para armazenar o usuário autenticado
declare namespace Express {
    export interface Request {
        user: {
          id: string;
        };
    } 
}
