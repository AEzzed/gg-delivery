import { useCallback, useEffect, useState } from 'react';
import s from './Catalog.module.scss';
import SidePanel from './SidePanel/SidePanel';
import Button from '../ui/Button/Button';
import CrossIcon from '../ui/assets/CrossIcon';
import DropDown from '../ui/DropDown/DropDown';
import ProductCard from './ProductCard/ProductCard';
import { productApi } from '../../api/productApi';
import type { ProductType, SortByStatusType } from '../../types/types';

const sortDropDownValues = ['По возрастанию цены', 'По убыванию цены'];

const Catalog = () => {
  const [sortByValue, setSortByValue] = useState<string>(sortDropDownValues[0]);
  const [sortByPrice, setSortByPrice] = useState<SortByStatusType>({
    min: 0,
    max: Infinity,
  });
  const [categoriesValue, setCategoriesValue] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<string[] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<null | ProductType[]>(null);

  const getCategories = async () => {
    const categories = await productApi.getCategories();

    if (categories) {
      setAllCategories(categories);
      setCategoriesValue(categories[0]);
    }
  };

  const getProducts = useCallback(async () => {
    const productsData = await productApi.getCatalog(categories);
    if (productsData) {
      setProducts(productsData);
    }
  }, [categories]);

  const handleDeleteCategory = (item: string) => {
    setCategories((prev) => prev.filter((el) => el !== item));
  };

  const handleChangeCategory = (item: string) => {
    setCategories(
      categories.includes(item) ? categories : [...categories, item]
    );

    return setCategoriesValue(item);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [categories, allCategories, getProducts]);

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
          <span>Найдено {products?.length ?? 0} наименований</span>
          <div className={s.categoriesWrapper}>
            <div className={s.categories}>
              {categories.map((category, index) => (
                <Button
                  classname={s.categoryBtn}
                  onclick={() => handleDeleteCategory(category)}
                  key={`${index}-${category}`}
                  type="grey"
                >
                  <CrossIcon />
                  {category}
                </Button>
              ))}
            </div>

            {categories.length > 0 && (
              <Button
                classname={s.categoryBtn}
                onclick={() => setCategories([])}
                type="strokeDark"
              >
                Очистить фильтры
              </Button>
            )}

            {allCategories && categoriesValue && (
              <DropDown
                dropDownItems={allCategories}
                dropDownValue={categoriesValue}
                setDropDownValue={handleChangeCategory}
                classname={s.tagBtn}
              />
            )}
          </div>

          {products ? (
            <div className={s.productsContainer}>
              {products
                .filter(
                  (item) =>
                    item.price >= sortByPrice.min &&
                    item.price <= sortByPrice.max
                )
                .sort((a, b) =>
                  sortByValue === 'По убыванию цены'
                    ? b.price - a.price
                    : a.price - b.price
                )
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </div>
          ) : (
            <div className="">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
