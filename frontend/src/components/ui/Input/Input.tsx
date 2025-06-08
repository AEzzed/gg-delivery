import React, { useState } from 'react';
import s from './Input.module.scss';
import EyeIcon from '../assets/EyeIcon';

type InputType = 'number' | 'text' | 'password';

interface IInput {
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string | undefined;
  type: InputType;
  placeholder?: string;
  toggleBtn?: boolean;
  classname?: string;
}

const Input = ({
  onchange,
  value,
  type,
  placeholder,
  toggleBtn,
  classname,
}: IInput) => {
  const [inpType, setInpType] = useState<InputType>(type);

  function toggleVisibility() {
    if (type === 'password') {
      setInpType(inpType === 'password' ? 'text' : 'password');
    }
  }

  return (
    <div className={s.wrapper}>
      <input
        onChange={onchange}
        value={value}
        type={inpType}
        className={`${s.inp} ${classname}`}
        placeholder={placeholder}
      ></input>

      {toggleBtn && (
        <button
          type="button"
          onClick={toggleVisibility}
          className={s.toggleBtn}
        >
          <EyeIcon />
        </button>
      )}
    </div>
  );
};

export default Input;
