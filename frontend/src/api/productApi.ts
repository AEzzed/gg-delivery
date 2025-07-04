import type { ProductType, OrdersType, CartType } from '../types/types';
import axios from './instance';

type ProductChangeType = {
  userId: number;
  productId: number;
};

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
  }: ProductChangeType & { quantity: number }): Promise<string | undefined> {
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
  }: ProductChangeType & { quantity: number }): Promise<string | undefined> {
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

  async removeAllProduct({
    userId,
    productId,
  }: ProductChangeType ): Promise<string | undefined> {
    try {
      const res = await axios.post('/api/cart/remove', {
        user_id: userId,
        product_id: productId,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getProductQuantity({
    userId,
    productId,
  }: ProductChangeType): Promise<{ quantity: number } | undefined> {
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

  async getProduct({
    product_id,
  }: {
    product_id: string;
  }): Promise<ProductType | undefined> {
    try {
      const res = await axios.get('/api/product', {
        params: {
          product_id,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getHistory({
    userId,
  }: {
    userId: string;
  }): Promise<OrdersType[] | undefined> {
    try {
      const res = await axios.get('/api/cart/history', {
        params: {
          user_id: userId,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getOrders({
    userId,
  }: {
    userId: string;
  }): Promise<OrdersType[] | undefined> {
    try {
      const res = await axios.get('/api/orders', {
        params: {
          user_id: userId,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  async getCart({
    userId,
  }: {
    userId: string;
  }): Promise<CartType | undefined> {
    try {
      const res = await axios.get('/api/cart', {
        params: {
          user_id: userId,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  confirmOrder: async ({
    userId,
    paymentMethod,
    deliveryMethod,
  }: {
    userId: number;
    paymentMethod: string;
    deliveryMethod: string;
  }) => {
    const res = await axios.post('/api/order/confirm', {
      user_id: userId,
      payment_method: paymentMethod,
      delivery_method: deliveryMethod,
    });
    return res.data;
  },
};
