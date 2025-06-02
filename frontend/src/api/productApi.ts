import type { ProductType } from '../components/Catalog/types';
import axios from './instance';

export const productApi = {
  async getCatalog(categories: string[]): Promise<ProductType[] | undefined> {
    try {
      const res = await axios.post('/api/catalog', {
        categories,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getCategories(): Promise<string[] | undefined> {
    try {
      const res = await axios.get('/api/categories');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  

};
