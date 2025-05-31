import React from 'react';
import s from './SidePanel.module.scss';
import DropDown from '../../ui/DropDown/DropDown';
import type { SortByStatusType } from '../Catalog';

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
        dropDownItems={sortDropDownValues}
        dropDownValue={sortByValue}
        setDropDownValue={setSortByValue}
        label="Сортировать по"
      />

      <div className={s.sortInputs}>
        <label className={s.label}>Цена</label>
        <div className="">
          <input
            type="number"
            onChange={(e) =>
              setSortByPrice((prev) => ({
                ...prev,
                min: Number(e.target.value),
              }))
            }
            value={sortByPrice.min ? sortByPrice.min : undefined}
            className={s.sortInput}
            placeholder="От"
          />
          <input
            onChange={(e) =>
              setSortByPrice((prev) => ({
                ...prev,
                max: Number(e.target.value),
              }))
            }
            value={sortByPrice.max ? sortByPrice.max : undefined}
            type="number"
            className={s.sortInput}
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
