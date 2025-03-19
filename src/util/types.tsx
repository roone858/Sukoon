import { Dispatch, SetStateAction } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface BreadcrumbLink {
  to: string;
  label: string;
  isActive: boolean;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: null;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}
export interface StoreContextType {
  products: Product[];
  cart: Product[];
  updateProducts: (newProducts: Product[]) => void;
  updateCart: (newProduct: Product[]) => void;
  removeItemFromCart: (id: number) => void;
  isLoading: boolean;
}
