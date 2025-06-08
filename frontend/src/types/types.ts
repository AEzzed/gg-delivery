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

export interface OrdersType {
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

export interface CartItemType {
  product_id: string;
  name: string;
  image_url: string;
  item_price: number;
  total_price: number;
}

export interface CartType {
  id: string;
  total_price: number;
  items: CartItemType[];
}
