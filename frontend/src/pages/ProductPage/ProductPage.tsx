import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '../../api/productApi';
import type { ProductType } from '../../types/types';
import NavPanel from '../../components/NavPanel/NavPanel';

import s from './ProductPage.module.scss';
import { getImagePath } from '../../utils/utils';
import Button from '../../components/ui/Button/Button';
import CrossIcon from '../../components/ui/assets/CrossIcon';
import { useCartItem } from '../../hooks/useCartItem';
import useCheckAuth from '../../hooks/useCheckAuth';

const ProductPage = () => {
  const { prodid } = useParams();
  const userId = sessionStorage.getItem('isAuth');

  const [product, setProduct] = useState<ProductType | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { quantity, addToCart, removeFromCart, refresh } = useCartItem(
    userId,
    prodid
  );

  useCheckAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (prodid) {
        const res = await productApi.getProduct({ product_id: prodid });
        setProduct(res ?? null);
      }
    };
    fetchProduct();
  }, [prodid]);

  const handleRemoveFromCart = async () => {
    productApi.removeAllProduct({
      productId: Number(prodid),
      userId: Number(userId),
    });

    refresh();
  };

  return (
    <div className={s.wrapper}>
      {isSuccess && (
        <div onClick={() => setIsSuccess(false)} className={s.modal}>
          Заказ добавлен в корзину
        </div>
      )}

      {product ? (
        <>
          <NavPanel pathName="Страница товара" />
          <div className={s.productConatiner}>
            <div className={s.productImage}>
              <img src={getImagePath(product.image_url)} alt={product.name} />
            </div>
            <div className={s.productInfo}>
              <h1 className={s.productName}>{product.name}</h1>
              <span className={s.productPrice}>{product.price} рублей</span>
              {quantity > 0 ? (
                <div className={s.btnsContainer}>
                  <div className={s.quantityBtn}>
                    <button onClick={removeFromCart}>-</button>
                    <span>{quantity}</span>
                    <button onClick={addToCart}>+</button>
                  </div>

                  {prodid && userId && (
                    <button
                      className={s.clearBtn}
                      onClick={handleRemoveFromCart}
                    >
                      <CrossIcon />
                    </button>
                  )}
                </div>
              ) : (
                <Button
                  onclick={() => {
                    addToCart();
                    setIsSuccess(true);
                  }}
                  classname={s.addBtn}
                  type="main"
                >
                  Добавить в корзину
                </Button>
              )}
              <p className={s.productDesc}>{product.description}</p>
              <Button type="grey">{product.category}</Button>
            </div>
          </div>
        </>
      ) : (
        <div className="">Loading...</div>
      )}
    </div>
  );
};

export default ProductPage;
