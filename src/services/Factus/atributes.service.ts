
import type { Product } from '../../models/product';
import QueryService from '../query.service';

export default new class ProductsService extends QueryService<Product>{
  constructor() {
    super(`/tributes/products`, 'products');
  }
};