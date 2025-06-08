import React from 'react';
import s from './Button.module.scss';

type ButtonType = 'strokeLight' | 'strokeDark' | 'grey' | 'main';

interface IButton extends React.PropsWithChildren {
  type: ButtonType;
  classname?: string;
  onclick?: () => void;
}

const Button = ({ children, type, classname, onclick }: IButton) => {
  return (
    <button onClick={onclick} className={`${s.button} ${s[type]} ${classname}`}>
      {children}
    </button>
  );
};

export default Button;
