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
  isAuthenticated: boolean;
  user: User;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User>>;
  loading: boolean;
}
export interface StoreContextType {
  products: Product[];
  cart: Product[];
  users: User[];
  updateProducts: (newProducts: Product[]) => void;
  updateUsers: (newUsers: User[]) => void;
  updateCart: (newProduct: Product[]) => void;
  removeItemFromCart: (id: string) => void;
  isLoading: boolean;
}
