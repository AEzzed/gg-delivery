import React from 'react';
import s from './Button.module.scss';

type ButtonType = 'stroke-light' | 'stroke-dark' | 'grey';

interface IButton extends React.PropsWithChildren {
  type: ButtonType;
  classname?: string;
  onclick?: () => void;
}

function useButtonType(type: ButtonType) {
  switch (type) {
    case 'stroke-light':
      return s.strokeLight;
    case 'stroke-dark':
      return s.strokeDark;
    case 'grey':
      return s.grey;
  }
}

const Button = ({ children, type, classname, onclick }: IButton) => {
  return (
    <button
      onClick={onclick}
      className={`${s.button} ${useButtonType(type)} ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
