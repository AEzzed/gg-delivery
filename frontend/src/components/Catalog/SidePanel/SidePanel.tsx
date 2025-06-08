import React from 'react';
import s from './SidePanel.module.scss';
import DropDown from '../../ui/DropDown/DropDown';
import Input from '../../ui/Input/Input';
import type { SortByStatusType } from '../../../types/types';

interface ISidePanel {
  sortDropDownValues: string[];
  sortByValue: string;
  setSortByValue: (value: string) => void;

  sortByPrice: SortByStatusType;
  setSortByPrice: React.Dispatch<React.SetStateAction<SortByStatusType>>;
}

const SidePanel = ({
  sortByPrice,
  setSortByPrice,
  setSortByValue,
  sortDropDownValues,
  sortByValue,
}: ISidePanel) => {
  return (
    <aside className={s.sortContainer}>
      <DropDown
        items={sortDropDownValues}
        value={sortByValue}
        setValue={setSortByValue}
        label="Сортировать по"
      />

      <div className={s.sortInputs}>
        <label className={s.label}>Цена</label>
        <div className="">
          <Input
            type="number"
            onchange={(e) =>
              setSortByPrice((prev) => ({
                ...prev,
                min: Number(e.target.value),
              }))
            }
            value={sortByPrice.min ? sortByPrice.min : undefined}
            classname={s.sortInput}
            placeholder="От"
          />
          <Input
            onchange={(e) =>
              setSortByPrice((prev) => ({
                ...prev,
                max: Number(e.target.value) || Infinity,
              }))
            }
            value={sortByPrice.max ? sortByPrice.max : undefined}
            type="number"
            classname={s.sortInput}
            placeholder="До"
          />
        </div>
      </div>

      <div className={s.sortBanner}>
        <p className={s.sortBannerTitle}>Сделай завтрак полезным и легким</p>
      </div>
    </aside>
  );
};

export default SidePanel;
