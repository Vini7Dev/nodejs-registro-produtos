// Dados que podem ser usados para filtrar produtos na listagem
interface IProductsSearchFilter {
  product_name?: string;
  min_price?: number;
  max_price?: number;
  category_name?: string;
}

export default IProductsSearchFilter;
