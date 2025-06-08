import { useEffect, useState } from 'react';
import s from './ProductCard.module.scss';
import type { ProductType } from '../../../types/types';
import { productApi } from '../../../api/productApi';

const ProductCard = ({ id, name, price, image_url }: ProductType) => {
  const [currAmount, setCurrAmount] = useState(0);
  const userId = sessionStorage.getItem('isAuth');
  const imagePath = image_url
    ? `/images/products/${image_url}`
    : '/images/products/plug-img.png';

  useEffect(() => {
    if (userId && id) {
      const fetchQuantity = async () => {
        try {
          const res = await productApi.getProductQuantity({
            userId: Number(userId),
            productId: Number(id),
          });
          setCurrAmount(res?.quantity ?? 0);
        } catch {
          setCurrAmount(0);
        }
      };

      fetchQuantity();
    }
  }, [userId, id]);

  const changeCartItemQuantity = async (delta: number) => {
    const isAdding = delta > 0;
    const amount = Math.abs(delta);

    setCurrAmount((prev) => Math.max(prev + delta, 0));

    try {
      const apiMethod = isAdding ? productApi.addProduct : productApi.removeProduct;

      await apiMethod({
        userId: Number(userId),
        productId: Number(id),
        quantity: amount,
      });

      const res = await productApi.getProductQuantity({
        userId: Number(userId),
        productId: Number(id),
      });

      setCurrAmount(res?.quantity ?? 0);
    } catch (error) {
      setCurrAmount((prev) => Math.max(prev - delta, 0));
      console.error(`Ошибка ${isAdding ? 'добавления' : 'удаления'} товара`, error);
    }
  };

  const handleAddToCart = () => changeCartItemQuantity(1);
  const handleRemoveFromCart = () => changeCartItemQuantity(-1);

  return (
    <div className={s.cardWrapper}>
      <div className={s.topCard}>
        <img src={imagePath} alt={name} />

        <div className={s.cardButtons}>
          {currAmount > 0 && (
            <>
              <button onClick={handleRemoveFromCart}>-</button>
              <span>{currAmount}</span>
            </>
          )}
          <button onClick={handleAddToCart}>+</button>
        </div>
      </div>

      <span className={s.price}>{price} рублей</span>
      <h4 className={s.name}>{name}</h4>
    </div>
  );
};

export default ProductCard;