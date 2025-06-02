import axios from './instance';

export const productApi = {
  getCatalog(category = '') {
    return axios.get('/products', {
      params: { category },
    });
  },

  async getCategories(): Promise<string[]> {
    const res = await axios.get('/categories');
    return res.data;
  },
};
