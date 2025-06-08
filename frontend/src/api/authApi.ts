import type { AuthType } from '../types/types';
import axios from './instance';

export const authApi = {
  async login({ password, login }: AuthType): Promise<string | undefined> {
    try {
      const res = await axios.post('api/login', {
        password,
        login,
      });
      console.log(res.data.uid);
      
      sessionStorage.setItem('isAuth', res.data.uid);

      return;
    } catch (err: any) {
      console.error(err.response.data.message);
      return err.response?.data?.message || 'Произошла ошибка';
    }
  },

  async register({ password, login }: AuthType): Promise<string | void> {
    try {
      const res = await axios.post('api/register', {
        password,
        login,
        role: 'user',
      });
      sessionStorage.setItem('isAuth', res.data.uid);

      return;
    } catch (err: any) {
      console.error(err.response.data.message);
      return err.response?.data?.message || 'Произошла ошибка';
    }
  },
};
