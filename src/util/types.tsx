import { Dispatch, SetStateAction } from "react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  _id?: string;
  name: string;
  username: string;
  googleId?: string;
  profilePicture?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  emailConfirmed?: boolean;
  role?: "admin" | "user";
  address?: {
    street: string;
    city: string;
    zip: string;
  };
  createdAt?: Date;
}
export interface CartItem {
  productId: string;
  quantity: number;
}
export const emptyUser = {
  _id: "",
  googleId: "",
  email: "",
  name: "",
  profilePicture: "",
  username: "",
};
export interface BreadcrumbLink {
  to: string;
  label: string;
  isActive: boolean;
}

export interface AuthContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export interface StoreContextType {
  products: Product[];
  users: User[];
  updateProducts: (newProducts: Product[]) => void;
  updateUsers: (newUsers: User[]) => void;

  isLoading: boolean;
}
export interface CartContextType {
  cart: CartItem[];
  updateCart: (newProduct: CartItem[]) => void;
  removeItemFromCart: (id: string) => void;
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  isLoading: boolean;
}
