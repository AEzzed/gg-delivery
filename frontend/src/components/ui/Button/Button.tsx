import React from 'react';
import s from './Button.module.scss';

type ButtonType = 'strokeLight' | 'strokeDark' | 'grey' | 'main';

interface IButton {
  type: ButtonType;
  classname?: string;
  onclick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = ({ children, type, classname, onclick, disabled }: IButton) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`${s.button} ${s[type]} ${
        disabled ? s.disabled : ''
      } ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
