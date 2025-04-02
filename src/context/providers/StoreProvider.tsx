import { ReactNode, useEffect, useState, useCallback } from "react";
import { Order, Product, User } from "../../util/types";
import { StoreContext } from "..";
import productService from "../../services/products.service";
import { productsDb } from "../../db";
import { useAuthContext } from "../hooks/useAuthContext";

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(user?.wishlist || []);
  const [isLoading, setIsLoading] = useState(true);

  const updateProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
  }, []);
  const updateUsers = useCallback((newUsers: User[]) => {
    setUsers(newUsers);
  }, []);
  const updateOrders = useCallback((newOrders: Order[]) => {
    setOrders(newOrders);
  }, []);
  const updateWishlist = useCallback((newWishlist: string[]) => {
    setWishlist(newWishlist);
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const products = await productService.getAll();
      setProducts([...products, ...productsDb]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setWishlist(user.wishlist || []);
  }, [user.wishlist]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StoreContext.Provider
      value={{
        products,
        updateProducts,
        users,
        updateUsers,
        orders,
        updateOrders,
        isLoading,
        wishlist,
        updateWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
