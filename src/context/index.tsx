import { createContext } from "react";
import { AuthContextType, StoreContextType } from "../util/types";

export const StoreContext = createContext<StoreContextType>({
  products: [],
  cart: [],
  updateProducts: () => {},
  updateCart: () => {},
  removeItemFromCart: () => {},
  isLoading: false,
});

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: () => undefined,
  loading: true, // Default to loading
});
