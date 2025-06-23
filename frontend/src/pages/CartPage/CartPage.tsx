import { useEffect, useState } from 'react';
import NavPanel from '../../components/NavPanel/NavPanel';
import s from './CartPage.module.scss';
import Button from '../../components/ui/Button/Button';
import type { CartType } from '../../types/types';
import { productApi } from '../../api/productApi';
import CartItem from './CartItem/CartItem';
import DropDown from '../../components/ui/DropDown/DropDown';
import useCheckAuth from '../../hooks/useCheckAuth';

const deliveryMethods = ['Курьер', 'Самовывоз'];
const paymentMethods = ['Наличными', 'Qr-code'];

const CartPage = () => {
  useCheckAuth();

  const [notification, setNotification] = useState(true);
  const [cart, setCart] = useState<CartType | null>(null);
  const userId = sessionStorage.getItem('isAuth');
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0]);
  const [deliveryMethod, setDeliveryMethod] = useState<string>(
    deliveryMethods[0]
  );

  const fetchCart = async () => {
    if (userId) {
      const res = await productApi.getCart({ userId });
      setCart(res ?? null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  useEffect(() => {
    if (cart?.total_price && cart.total_price >= 1000) {
      setNotification(true);
    } else {
      setNotification(false);
    }
  }, [cart?.total_price]);

  const handleConfirmOrder = async () => {
    console.log('Ordered');

    if (userId) {
      try {
        await productApi.confirmOrder({
          userId: Number(userId),
          deliveryMethod,
          paymentMethod,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsSuccess(true);
        fetchCart();
      }
    }
  };

  const [total, setTotal] = useState<number>(30);

  useEffect(() => {
    if (cart?.total_price != 0) {
      const deliveryPrice = notification || deliveryMethod === 'Самовывоз' ? 0 : 78;
      const newTotal = Number(cart?.total_price) + 30 + deliveryPrice;
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [cart?.total_price, deliveryMethod, notification]);

  return (
    <div className={s.wrapper}>
      {isSuccess && (
        <div onClick={() => setIsSuccess(false)} className={s.modal}>
          Заказ успешно оформлен!
        </div>
      )}
      <NavPanel pathName="Корзина" />

      <h3 className={s.title}>Корзина</h3>

      <div className={s.cartWrapper}>
        {cart?.items && cart.items.length > 0 ? (
          <div className={s.cartItems}>
            {cart.items.map((item) => (
              <CartItem
                key={item.product_id}
                refreshCart={fetchCart}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="">Ваша корзина пуста</div>
        )}
        <div className={s.OrderInfo}>
          {notification && (
            <p className={s.notification}>
              Поздравляем! Вы достигили суммы заказа 1000 ₽, теперь доставка -
              бесплатно!
            </p>
          )}

          <div className={s.infoContainer}>
            <span className={s.infoTitle}>Информация о заказе</span>

            <span className={s.divider} />

            <div className={s.dropDownContainer}>
              <span>Способ доставки</span>
              <DropDown
                value={deliveryMethod}
                setValue={setDeliveryMethod}
                items={deliveryMethods}
                classname={s.dropDown}
              />
            </div>

            <div className={s.dropDownContainer}>
              <span>Способ оплаты</span>
              <DropDown
                value={paymentMethod}
                setValue={setPaymentMethod}
                items={paymentMethods}
                classname={s.dropDown}
              />
            </div>

            <span className={s.divider} />

            <div className={s.infoItem}>
              <span>Стоимость ({cart?.items?.length ?? 0} товаров):</span>
              <span className={s.infoItemBold}>{cart?.total_price ?? 0} ₽</span>
            </div>
            <div className={s.infoItem}>
              <span>Сервисный сбор:</span>
              <span className={s.infoItemBold}>30 ₽</span>
            </div>
            <div className={s.infoItem}>
              <span>Доставка:</span>
              <span className={s.infoItemBold}>
                {notification || deliveryMethod === 'Самовывоз'
                  ? 'Бесплатно'
                  : '78 ₽'}
              </span>
            </div>

            <span className={s.divider}></span>

            <div className={s.infoItem}>
              <span>Итого:</span>
              <span className={s.price}>
                {total} ₽
              </span>
            </div>

            <Button
              disabled={cart?.total_price == 0}
              onclick={handleConfirmOrder}
              type="main"
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
