import React, { useState } from 'react';
import s from './DropDown.module.scss';
import Button from '../Button/Button';
import SmallArrow from '../assets/SmallArrow';

interface IDropDown {
  value: string;
  setValue: (value: string) => void;
  items: string[];
  label?: string;
  classname?: string;
}

const DropDown = ({
  value,
  setValue,
  items,
  label,
  classname,
}: IDropDown) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(value: string) {
    if (isOpen) {
      setValue(value);
    }
    setIsOpen((prev) => !prev);
  }

  return (
    <div className={s.dropDownWrapper}>
      {label && <span className={s.dropDownLabel}>{label}</span>}

      <Button
        classname={`${s.btn} ${classname}`}
        onclick={() => setIsOpen(!isOpen)}
        type="strokeDark"
      >
        {value}

        <span
          style={{
            transition: 'all 0.3s',
            transform: !isOpen ? 'rotate(0deg)' : 'rotate(-180deg)',
          }}
        >
          <SmallArrow />
        </span>
      </Button>

      {isOpen && (
        <ul className={s.dropDownList}>
          {items.map((item, index) => (
            <li
              key={`${index}-${item}`}
              className={s.dropDownItem}
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
