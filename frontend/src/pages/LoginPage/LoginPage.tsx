import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

import s from './LoginPage.module.scss';
import Input from '../../components/ui/Input/Input';
import type { AuthType } from '../../types/types';
import { authApi } from '../../api/authApi';

const LoginPage = ({ setIsAuth }: { setIsAuth: (item: boolean) => void }) => {
  const [loginData, setLoginData] = useState<AuthType>({
    password: '',
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

    const { login, password } = loginData;

    if (password.trim() != '') {
      const res = await authApi.login({
        login: login.trim(),
        password: password.trim(),
      });

      if (res) {
        setError(res);
        return;
      }
      setIsAuth(true);
    } else {
      setError('Пароль не должен быть пустым!');
    }
  }

  return (
    <section onSubmit={handleSubmit} className={s.wrapper}>
      <h1 className={s.title}>Рады снова вас видеть!</h1>
      <div className={s.subtitle}>
        <span>Нет аккаунта?</span>
        <Link to="/signup">Создать аккаунт</Link>
      </div>

      <form className={s.formConteainer}>
        <Input
          type="text"
          value={loginData.login}
          onchange={(e) =>
            setLoginData((prev) => ({ ...prev, login: e.target.value }))
          }
          placeholder="Логин"
        />
        <Input
          type="password"
          value={loginData.password}
          onchange={(e) =>
            setLoginData((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Пароль"
          toggleBtn
        />
        {error !== null ? <span className={s.error}>{error}</span> : null}
        <Button type="main">Войти</Button>
      </form>
    </section>
  );
};

export default LoginPage;
