import { useState } from 'react';
import s from './Catalog.module.scss';
import SidePanel from './SidePanel/SidePanel';
import Button from '../ui/Button/Button';
import CrossIcon from '../ui/assets/CrossIcon';
import DropDown from '../ui/DropDown/DropDown';
import ProductCard from './ProductCard/ProductCard';

export type SortByStatusType = { min: number; max: number };
const sortDropDownValues = ['По возрастанию цены', 'По убыванию цены'];

const tagsItems = ['Овощи', 'Свежая выпечка', 'Meat', 'Apples', 'Green'];

const products = [
  {
    title: 'Мюсли Fitness  Energy, без глютена',
    price: 10,
    amount: 1,
    image: '/fitsness-energy.png',
  },
];

const Catalog = () => {
  const [sortByValue, setSortByValue] = useState<string>(sortDropDownValues[0]);
  const [sortByPrice, setSortByPrice] = useState<SortByStatusType>({
    min: 0,
    max: 0,
  });
  const [tagsValue, setTagsValue] = useState<string>(tagsItems[0]);
  const [tags, setTags] = useState<string[]>(tagsItems);

  const handleDeleteTag = (item: string) => {
    setTags((prev) => prev.filter((el) => el !== item));
  };

  const handleChangeTag = (item: string) => {
    setTags((prev) => (!prev.includes(item) ? [...prev, item] : prev));
    return setTagsValue(item);
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Каталог продуктов</h2>

      <div className={s.content}>
        <SidePanel
          setSortByPrice={setSortByPrice}
          setSortByValue={setSortByValue}
          sortByPrice={sortByPrice}
          sortByValue={sortByValue}
          sortDropDownValues={sortDropDownValues}
        />

        <div className={s.catalog}>
          <span>Найдено 200 наименований</span>
          <div className={s.tagsWrapper}>
            <div className={s.tags}>
              {tags.map((tag, index) => (
                <Button
                  classname={s.tagBtn}
                  onclick={() => handleDeleteTag(tag)}
                  key={`${index}-${tag}`}
                  type="grey"
                >
                  <CrossIcon />
                  {tag}
                </Button>
              ))}
            </div>
            {tags.length > 0 && (
              <Button
                classname={s.tagBtn}
                onclick={() => setTags([])}
                type="stroke-dark"
              >
                Очистить фильтры
              </Button>
            )}

            <DropDown
              dropDownItems={tagsItems}
              dropDownValue={tagsValue}
              setDropDownValue={handleChangeTag}
              classname={s.tagBtn}
            />
          </div>

          <div className={s.productsContainer}>
            {products.map((product) => (
              <ProductCard {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
