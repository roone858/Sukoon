import { Dispatch, SetStateAction } from "react";

interface ProductImage {
  public_id?: string;
  url: string;
  altText?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  discountEndDate?: Date | string;
  categories: string[];
  tags?: string[];
  images: ProductImage[];
  createdAt?: Date | string;
  updatedAt?: Date | string;

  // Virtual field (calculated on backend)
  finalPrice?: number;
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
  name: string;
  price: number;
  quantity: number;
  image?: string; // Optional field
}
interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;

  userId?: string; // Optional, as it may not always be provided
  items: OrderItem[];
  customerName: string;
  deliveryAddress: string;
  totalAmount: number;
  pickupMethod: "delivery" | "pickup"; // Restricted to specific values
  notes?: string; // Optional field
  createdAt?: Date; // Automatically added by Mongoose
  updatedAt?: Date; // Automatically added by Mongoose
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
  orders: Order[];
  updateProducts: (newProducts: Product[]) => void;
  updateUsers: (newUsers: User[]) => void;
  updateOrders: (newUsers: Order[]) => void;

  isLoading: boolean;
}
export interface CartContextType {
  cart: CartItem[];
  updateCart: (newProduct: CartItem[]) => void;
  removeItemFromCart: (id: string) => void;
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  isLoading: boolean;
}
