import type { ProductType } from '../types/types';
import axios from './instance';

type ProductChangeType = {
  userId: number;
  productId: number;
}

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

  async addProduct({
    userId,
    productId,
    quantity,
  }: ProductChangeType & {quantity: number}): Promise<string | undefined> {
    try {
      const res = await axios.post('/api/cart/item/add', {
        user_id: userId,
        product_id: productId,
        quantity,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  async removeProduct({
    userId,
    productId,
    quantity,
  }: ProductChangeType & {quantity: number}): Promise<string | undefined> {
    try {
      const res = await axios.post('/api/cart/item/remove', {
        user_id: userId,
        product_id: productId,
        quantity,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getProductQuantity({
    userId,
    productId,
  }: ProductChangeType): Promise<{quantity: number} | undefined> {
    try {
      const res = await axios.post('/api/cart/item/quantity', {
        user_id: userId,
        product_id: productId,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },


};
