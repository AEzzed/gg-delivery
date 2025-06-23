import { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';

export const useCartItem = (
  userId: string | null,
  productId: string | undefined
) => {
  const [quantity, setQuantity] = useState<number>(0);

  const fetchQuantity = async () => {
    if (!userId || !productId) return;
    try {
      const res = await productApi.getProductQuantity({
        userId: Number(userId),
        productId: Number(productId),
      });
      setQuantity(res?.quantity ?? 0);
    } catch {
      setQuantity(0);
    }
  };

  const changeQuantity = async (delta: number) => {
    const isAdding = delta > 0;
    const amount = Math.abs(delta);
    setQuantity((prev) => Math.max(prev + delta, 0));

    try {
      const apiMethod = isAdding
        ? productApi.addProduct
        : productApi.removeProduct;

      await apiMethod({
        userId: Number(userId),
        productId: Number(productId),
        quantity: amount,
      });
    } catch (error) {
      setQuantity((prev) => Math.max(prev - delta, 0));
      console.error(
        `Ошибка ${isAdding ? 'добавления' : 'удаления'} товара`,
        error
      );
    } finally {
      fetchQuantity();
    }
  };
  
  const addToCart = () => changeQuantity(1);
  const removeFromCart = () => changeQuantity(-1);

  useEffect(() => {
    fetchQuantity();
  }, [userId, productId]);

  return { quantity, addToCart, removeFromCart, refresh: fetchQuantity };
};
