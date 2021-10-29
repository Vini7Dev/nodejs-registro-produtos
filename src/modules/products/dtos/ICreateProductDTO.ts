// Dados necessários para o cadastro de um novo produto
interface ICreateProductDTO {
  name: string;
  description: string;
  price: number;
  category_id: string;
  user_id: string;
}

export default ICreateProductDTO;
