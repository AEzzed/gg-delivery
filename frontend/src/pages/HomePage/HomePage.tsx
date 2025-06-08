import Catalog from '../../components/Catalog/Catalog';
import Button from '../../components/ui/Button/Button';
import useCheckAuth from '../../hooks/useCheckAuth';
import s from './HomePage.module.scss';

const HomePage = () => {
  useCheckAuth();

  return (
    <div className={s.wrapper}>
      <div className={s.heroWrapper}>
        <div className={s.heroContainer}>
          <span className={s.subtitle}>
            🔥 Бесплатная доставка - от 1000 руб.
          </span>
          <h1 className={s.title}>
            Здоровая еда <br /> доступна каждому!
          </h1>
          <Button type="strokeLight">Заказать сейчас</Button>
        </div>
      </div>

      <Catalog />
    </div>
  );
};

export default HomePage;
