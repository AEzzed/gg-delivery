import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import CartIcon from '../ui/assets/CartIcon';
import Logo from '../Logo';
import ProfileIcon from '../ui/assets/ProfileIcon';

const Header = () => {
  return (
    <header className={s.header}>
      <NavLink to="/">
        <Logo />
      </NavLink>

      <div className={s.links}>
        <NavLink to="/profile" className={s.linkItem}>
          <ProfileIcon />
        </NavLink>
        <NavLink to="/cart" className={s.linkItem}>
          <CartIcon />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
