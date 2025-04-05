import { createContext } from "react";
import {
  AuthContextType,
  CartContextType,
  StoreContextType,
} from "../util/types";

export const StoreContext = createContext<StoreContextType>({
  products: [],
  categories: [],
  updateProducts: () => {},
  users: [],
  orders: [],
  wishlist: [],
  fetchOrders: () => {},
  updateUsers: () => {},
  updateOrders: () => {},
  updateWishlist: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
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

export const AuthContext = createContext<AuthContextType | null>(null);
