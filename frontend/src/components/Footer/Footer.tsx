import Logo from '../Logo';
import s from './Footer.module.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={s.wrapper}>
      <div className={s.container}>
        <div className={s.top}>
          <NavLink to="/">
            <Logo />
          </NavLink>

          <div className={s.links}>
            <NavLink to="/cart" className={s.linkItem}>
              Корзина
            </NavLink>
            <NavLink to="/catalog" className={s.linkItem}>
              Каталог товаров
            </NavLink>
            <NavLink to="/profile" className={s.linkItem}>
              Личный кабинет
            </NavLink>
          </div>
        </div>
        <div className={s.bottom}>
          <p className={s.bottomText}>
            Благодаря широкому выбору свежих продуктов, основных продуктов
            питания и предметов первой необходимости для дома у нас есть все
            необходимое.
          </p>
          <span className={s.bottomText}>© All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
