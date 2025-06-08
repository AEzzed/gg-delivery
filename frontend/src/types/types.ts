export type SortByStatusType = { min: number; max: number };

export interface ProductType {
  id: string;
  name: string;
  price: number;
  category: string;
  stock_quantity: number;
  image_url: string;
  description: string;
}

export type AuthType = {
  password: string;
  login: string;
};

export interface UserType {
  id: string;
  login: string;
  role: string;
  created_at: Date;
}

export interface HistoryType {
  id: string;
  total_price: number;
  items: {
    product_id: string;
    name: string;
    image_url: string;
    quantity: number;
    price: number;
  }[];
}
