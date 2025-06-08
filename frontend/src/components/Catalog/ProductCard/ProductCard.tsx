import { useState } from 'react';
import s from './ProductCard.module.scss';
import type { ProductType } from '../../../types/types';

interface IProductCard extends ProductType {
  amount?: number;
}

const ProductCard = ({ name, price, amount = 0, image_url }: IProductCard) => {
  const [currAmount, setCurrAmount] = useState(amount);
  const imagePath =
    image_url != ''
      ? `/images/products/${image_url}`
      : '/images/products/plug-img.png';

  function handleAddToCart() {
    setCurrAmount((prev) => ++prev);
  }

  function handleRemoveFromCart() {
    setCurrAmount((prev) => --prev);
  }

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
