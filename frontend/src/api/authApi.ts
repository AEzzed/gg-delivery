import type { AuthType } from '../types/types';
import axios from './instance';

export const authApi = {
  async login({ password, login }: AuthType): Promise<string | undefined> {
    try {
      await axios.post('api/login', {
        password,
        login,
      });
      return;
    } catch (err) {
      console.error(err.response.data.message);
      return err.response?.data?.message || 'Произошла ошибка';
    }
  },
  async register({ password, login }: AuthType): Promise<string | void> {
    try {
      await axios.post('api/register', {
        password,
        login,
        role: 'user',
      }); 
    } catch (err) {
      console.error(err.response.data.message);
      return err.response?.data?.message || 'Произошла ошибка';
    }
  },
};
