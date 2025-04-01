import { createContext } from "react";
import {
  AuthContextType,
  CartContextType,
  emptyUser,
  StoreContextType,
} from "../util/types";

export const StoreContext = createContext<StoreContextType>({
  products: [],
  updateProducts: () => {},
  users: [],
  orders: [],
  updateUsers: () => {},
  updateOrders: () => {},
  isLoading: false,
});
export const CartContext = createContext<CartContextType>({
  cart: [],
  updateCart: () => {},
  removeItemFromCart: () => {},
  updateCartItemQuantity: () => {},
  addToCart: () => {},
  isLoading: false,
});

export const AuthContext = createContext<AuthContextType>({
  user: emptyUser,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => undefined,
  isLoading: true, // Default to loading
  setIsLoading: () => undefined,
  login: () => Promise.resolve(),
});
