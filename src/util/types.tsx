import { Dispatch, SetStateAction } from "react";
import { UserUpdateData } from "../components/ProfilePage/components/UpdateUserForm";
import { Product } from "../types/product.type";
import { Category } from "../types/category.type";


export interface User {
  _id?: string;
  name: string;
  username: string;
  googleId?: string;
  phone?: string;
  profilePicture?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  emailConfirmed?: boolean;
  wishlist?: string[];
  role?: "admin" | "user";
  address?: {
    street: string;
    city: string;
    zip: string;
  };
  createdAt?: Date;
}
export interface CartItem {
  productId: string; // ObjectId when not populated, IProduct when populated
  quantity: number;

  // Virtuals (for frontend usage)
  name: string;
  originalPrice: number;
  image: string;
  discountPercentage?: number;
  finalPrice: number; // price after discount
  itemTotal: number; // finalPrice * quantity
  dimensionId?: string;
}
interface OrderItem {
  productId: string;
  quantity: number;
  dimensionId?: string;
  price: number;
  name: string;
  subtotal: number;
}

interface Payment {
  method: "cash" | "card" | "wallet";
  status: "pending" | "completed" | "failed";
  transactionId?: string;
  amount: number;
  paidAt?: Date;
}

interface Delivery {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
}

export interface Order {
  _id?: string;
  userId?: string;
  orderNumber?: string;
  items: OrderItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  delivery: Delivery;
  payment: Payment;
  pickupMethod: "delivery" | "pickup";
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  status?:
    | "pending"
    | "confirmed"
    | "completed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  notes?: string;
  statusHistory?: Array<{ status: string; timestamp: Date; note: string }>;
  isArchived?: boolean;
  cancelledAt?: Date;
  cancellationReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  updateAuthenticatedUser: (
    userData: FormData | UserUpdateData
  ) => Promise<void>;
  logout: () => Promise<void>;
  verifyAndFetchUser: () => Promise<void>;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export interface StoreContextType {
  wishlist: string[];
  products: Product[];
  categories: Category[];
  users: User[];
  orders: Order[];
  updateProducts: (newProducts: Product[]) => void;
  updateCategories: (newProducts: Category[]) => void;
  fetchOrders: () => void;
  updateWishlist: (newProductsId: string[]) => void;
  updateUsers: (newUsers: User[]) => void;
  updateOrders: (newUsers: Order[]) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;

  isLoading: boolean;
}
export interface CartContextType {
  cart: CartItem[];
  updateCart: (newProduct: CartItem[]) => void;
  removeItemFromCart: (id: string) => void;
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  addToCart: (newItem: CartItem) => void;
  isLoading: boolean;
}
