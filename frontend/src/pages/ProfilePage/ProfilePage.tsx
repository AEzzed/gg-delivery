import { useEffect, useState } from 'react';
import NavPanel from '../../components/NavPanel/NavPanel';
import s from './ProfilePage.module.scss';
import type { OrdersType, UserType } from '../../types/types';
import { authApi } from '../../api/authApi';
import { productApi } from '../../api/productApi';
import { getImagePath } from '../../utils/utils';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [ordersHistory, setOrdersHistory] = useState<OrdersType[] | null>(
    null
  );

  const [orders, setOrders] = useState<OrdersType[] | null>(
    null
  );

  const userId = sessionStorage.getItem('isAuth');

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        const res = await authApi.getUser({ id: userId });
        setUserInfo(res ?? null);
      }
    };
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    const fetchOrdersHistory = async () => {
      if (userId) {
        const res = await productApi.getHistory({ userId });        
        setOrdersHistory(res ?? null);
      }
    };
    fetchOrdersHistory();
  }, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        const res = await productApi.getOrders({ userId });
        console.log(res);
        setOrders(res ?? null);
      }
    };
    fetchOrders();
  }, [userId]);


  return (
    <section className={s.wrapper}>
      <NavPanel pathName="Профиль" />

      <h2 className={s.title}>Личный кабинет</h2>
      <div className={s.info}>
        <span>Логин: </span>
        <span>{userInfo?.login ?? 'loading...'}</span>
      </div>
      <div className={s.info}>
        <span>Роль: </span>
        <span>{userInfo?.role ?? 'loading...'}</span>
      </div>

      <div className={s.ordersHistory}>
        <h5 className={s.title}>Активные заказы</h5>

        <div className={s.historyContainer}>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className={s.history}>
                <div className={s.historyHead}>
                  <h5>Заказ #{order.id}</h5>
                  <span>Итого: {order.total_price} ₽</span>
                </div>

                <div className={s.historyItems}>
                  {order.items.map((item, index) => (
                    <div key={`${index}-${item.product_id}`} className={s.historyItem}>
                      <div className={s.historyItemTitle}>
                        <img
                          src={getImagePath(item.image_url)}
                          alt={item.name}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span>Количество: {item.quantity}</span>
                      <span>Стоимость: {item.price} ₽</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="">У вас нет активных заказов</div>
          )}
        </div>
      </div>

      <div className={s.ordersHistory}>
        <h5 className={s.title}>История заказов</h5>

        <div className={s.historyContainer}>
          {ordersHistory && ordersHistory.length > 0 ? (
            ordersHistory.map((order) => (
              <div key={order.id} className={s.history}>
                <div className={s.historyHead}>
                  <h5>Заказ #{order.id}</h5>
                  <span>Итого: {order.total_price} ₽</span>
                </div>

                <div className={s.historyItems}>
                  {order.items.map((item) => (
                    <div key={item.product_id} className={s.historyItem}>
                      <div className={s.historyItemTitle}>
                        <img
                          src={getImagePath(item.image_url)}
                          alt={item.name}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span>Количество: {item.quantity}</span>
                      <span>Стоимость: {item.price} ₽</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="">Вы еще ничего не заказывали</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
