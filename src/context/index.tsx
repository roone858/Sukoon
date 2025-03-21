import { createContext } from "react";
import { AuthContextType, emptyUser, StoreContextType } from "../util/types";

export const StoreContext = createContext<StoreContextType>({
  products: [],
  users: [],
  cart: [],
  updateProducts: () => {},
  updateCart: () => {},
  removeItemFromCart: () => {},
  isLoading: false,
});

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: emptyUser,
  setIsAuthenticated: () => undefined,
  loading: true, // Default to loading
});
