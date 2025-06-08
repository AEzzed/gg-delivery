import s from './ProductCard.module.scss';
import type { ProductType } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { getImagePath } from '../../../utils/utils';
import { useCartItem } from '../../../hooks/useCartItem';

const ProductCard = ({
  id,
  name,
  price,
  image_url,
}: Omit<ProductType, 'description'>) => {
  const userId = sessionStorage.getItem('isAuth');

  const { quantity, addToCart, removeFromCart } = useCartItem(userId, id);
  const navigate = useNavigate();

  return (
    <div className={s.cardWrapper}>
      <div className={s.topCard}>
        <img
          src={getImagePath(image_url)}
          alt={name}
          onClick={() => navigate(`/${id}`)}
        />

        <div className={s.cardButtons}>
          {quantity > 0 && (
            <>
              <button onClick={() => removeFromCart()}>-</button>
              <span>{quantity}</span>
            </>
          )}
          <button onClick={() => addToCart()}>+</button>
        </div>
      </div>

      <div onClick={() => navigate(`/${id}`)}>
        <span className={s.price}>{price} рублей</span>
        <h4 className={s.name}>{name}</h4>
      </div>
    </div>
  );
};

export default ProductCard;
