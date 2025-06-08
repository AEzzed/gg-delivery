import s from './NavPanel.module.scss';
import { useNavigate } from 'react-router-dom';
import SmallArrow from '../ui/assets/SmallArrow';

const NavPanel = ({ pathName }: { pathName: string }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={s.container}>
      <button className={s.backBtn} onClick={handleBack}>
        <div style={{ transform: 'rotate(90deg)' }}>
          <SmallArrow />
        </div>
        Назад
      </button>

      <span className={s.divider}></span>

      <div className={s.pathContainer}>
        Главная
        <div style={{ transform: 'rotate(-90deg)' }}>
          <SmallArrow />
        </div>
        {pathName}
      </div>
    </div>
  );
};

export default NavPanel;
