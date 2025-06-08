import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import CartIcon from '../ui/assets/CartIcon';
import Logo from '../Logo';
import ProfileIcon from '../ui/assets/ProfileIcon';
import Button from '../ui/Button/Button';

const Header = () => {
  const cartNumber = 9;

  const handleLogout = () => {
    sessionStorage.clear();
    location.reload();
  };

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

          <span className={s.cartNumber}>{cartNumber}</span>
        </NavLink>
        <Button type="grey" onclick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
