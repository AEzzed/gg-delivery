import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

import s from './LoginPage.module.scss';
import Input from '../../components/ui/Input/Input';
import type { AuthType } from '../../types/types';
import { authApi } from '../../api/authApi';

const LoginPage = () => {
  const [loginData, setLoginData] = useState<AuthType>({
    password: '',
    login: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Form submitted!');

    authApi.login(loginData);
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
        <Button type="main">Войти</Button>
      </form>
    </section>
  );
};

export default LoginPage;
