import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

import s from './RegisterPage.module.scss';
import Input from '../../components/ui/Input/Input';
import type { AuthType } from '../../types/types';
import { authApi } from '../../api/authApi';

type RegisterType = AuthType & {
  confirmPassword: string;
};

const RegisterPage = ({
  setIsAuth,
}: {
  setIsAuth: (item: boolean) => void;
}) => {
  const [registerData, setRegisterData] = useState<RegisterType>({
    password: '',
    confirmPassword: '',
    login: '',
  });

  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();
  const isAuth = !!sessionStorage.getItem('isAuth');

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError(null);

    const { confirmPassword, password, login } = registerData;

    if (confirmPassword.trim() === password.trim() && password.trim() != '') {
      const res = await authApi.register({
        login: login.trim(),
        password: password.trim(),
      });

      if (res) {
        setError(res);
        return;
      }
      setIsAuth(true);
    } else {
      setError('Пароли не совпадают!');
    }
  }

  return (
    <section onSubmit={handleSubmit} className={s.wrapper}>
      <h1 className={s.title}>Создание аккаунта</h1>
      <div className={s.subtitle}>
        <span>Уже есть аккаунт?</span>
        <Link to="/login">Войти</Link>
      </div>

      <form className={s.formConteainer}>
        <Input
          type="text"
          value={registerData.login}
          onchange={(e) =>
            setRegisterData((prev) => ({ ...prev, login: e.target.value }))
          }
          placeholder="Логин"
        />
        <Input
          type="password"
          value={registerData.password}
          onchange={(e) =>
            setRegisterData((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Пароль"
          toggleBtn
        />

        <Input
          type="password"
          value={registerData.confirmPassword}
          onchange={(e) =>
            setRegisterData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          placeholder="Повторить пароль"
          toggleBtn
        />

        {error !== null ? <span className={s.error}>{error}</span> : null}

        <Button type="main">Войти</Button>
      </form>
    </section>
  );
};

export default RegisterPage;
