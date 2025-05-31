import { useState } from 'react';
import s from './ProductCard.module.scss';

interface IProductCard {
  title: string;
  price: number;
  amount: number;
  image: string;
}

const ProductCard = ({ title, price, amount, image }: IProductCard) => {
  const [currAmount, setCurrAmount] = useState(amount);
  const imagePath = image != '' ? `/images/products/${image}` : '/images/products/plug-img.png';

  function handleAddToCart() {
    setCurrAmount((prev) => ++prev);
  }

  function handleRemoveFromCart() {
    setCurrAmount((prev) => --prev);
  }

  return (
    <div className={s.cardWrapper}>
      <div className={s.topCard}>
        <img src={imagePath} alt={title} />

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
      <h4 className={s.title}>{title}</h4>
    </div>
  );
};

export default ProductCard;
