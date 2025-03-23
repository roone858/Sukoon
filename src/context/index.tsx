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
  isLoading: false,
});

export const AuthContext = createContext<AuthContextType>({
  user: emptyUser,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => undefined,
  loading: true, // Default to loading
  setLoading: () => undefined,
});
