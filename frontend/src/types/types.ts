export type SortByStatusType = { min: number; max: number };

export interface ProductType {
  id: string;
  name: string;
  price: number;
  category: string;
  stock_quantity: number;
  image_url: string;
}

export type AuthType = {
  password: string;
  login: string;
};