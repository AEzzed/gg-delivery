import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckAuth = (path: string = '/login') => {
  const navigate = useNavigate();
  const isAuth = !!sessionStorage.getItem('isAuth');

  useEffect(() => {
    if (!isAuth) {
      navigate(path);
    }
  }, [isAuth, navigate, path]);
};

export default useCheckAuth;
