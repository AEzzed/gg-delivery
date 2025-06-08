import type { CartItemType } from '../../../types/types';
import { productApi } from '../../../api/productApi';
import { useCartItem } from '../../../hooks/useCartItem';
import { getImagePath } from '../../../utils/utils';

import s from './CartItem.module.scss';
import CrossIcon from '../../../components/ui/assets/CrossIcon';

const CartItem = ({
  item,
  refreshCart,
}: {
  item: CartItemType;
  refreshCart: () => void;
}) => {
  const userId = sessionStorage.getItem('isAuth');

  const { quantity, addToCart, removeFromCart, refresh } = useCartItem(
    userId,
    item.product_id
  );

  const handleClearItem = async () => {
    productApi.removeAllProduct({
      productId: Number(item.product_id),
      userId: Number(userId),
    });

    refresh();
    refreshCart();
  };

  const handleAddToCart = () => {
    addToCart();
    refreshCart();
  };

  const handleRemoveFromCart = () => {
    removeFromCart();
    refreshCart();
  };

  return (
    <div key={item.product_id} className={s.container}>
      <div className={s.title}>
        <img src={getImagePath(item.image_url)} alt={item.name} />
        <h4>{item.name}</h4>
      </div>
      <span>{item.item_price} ₽</span>
      <div className={s.quantityBtn}>
        <button onClick={handleRemoveFromCart}>-</button>
        <span>{quantity}</span>
        <button onClick={handleAddToCart}>+</button>
      </div>
      <span>{item.total_price} ₽</span>

      {item.product_id && userId && (
        <button className={s.clearBtn} onClick={handleClearItem}>
          <CrossIcon />
        </button>
      )}
    </div>
  );
};

export default CartItem;
