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

  const { quantity, addToCart, removeFromCart } = useCartItem(
    userId,
    item.product_id
  );

  const handleClearItem = async () => {
    await productApi.removeAllProduct({
      productId: Number(item.product_id),
      userId: Number(userId),
    });

    refreshCart();
  };

  const handleAddToCart = async () => {
    await addToCart();
    refreshCart();
  };

  const handleRemoveFromCart = async () => {
    await removeFromCart();
    refreshCart();
  };

  return (
    <div key={item.product_id} className={s.container}>
      <div className={s.title}>
        <img src={getImagePath(item.image_url)} alt={item.name} />
        <h4>{item.name}</h4>
      </div>
      <div className={s.info}>
        <span>{item.item_price} ₽</span>
        <div className={s.quantityBtn}>
          <button onClick={handleRemoveFromCart}>-</button>
          <span>{quantity}</span>
          <button onClick={handleAddToCart}>+</button>
        </div>
        {item.product_id && userId && (
          <button className={s.modileClearBtn} onClick={handleClearItem}>
            <CrossIcon />
          </button>
        )}
        <span>{item.total_price} ₽</span>

        {item.product_id && userId && (
          <button className={s.clearBtn} onClick={handleClearItem}>
            <CrossIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
