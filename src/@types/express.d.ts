// Adicionando o objeto "user" nas tipagens da requisição
declare namespace Express {
    export interface Request {
        user: {
          id: string;
        };
    } 
}