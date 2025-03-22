import { ReactNode, useEffect, useState, useCallback } from "react";

// import { ImageType, PlanType } from "../../types";
// import imagesService from "../../services/images.service";
// import plansService from "../../services/plans.service";
import { Product, User } from "../../util/types";
import { StoreContext } from "..";
// import axios from "axios";
import productService from "../../services/products.service";
import { productsDb } from "../../db";

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
  }, []);
  const updateUsers = useCallback((newUsers: User[]) => {
    setUsers(newUsers);
  }, []);

  const updateCart = useCallback((newProducts: Product[]) => {
    setCart(newProducts);
  }, []);
  const removeItemFromCart = useCallback(
    (id: string) => {
      const updatedCart = cart.filter((product) => product._id !== id);
      setCart(updatedCart);
    },
    [cart]
  );

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
    fetchData();
  }, [fetchData]);

  return (
    <StoreContext.Provider
      value={{
        products,
        users,
        updateUsers,
        cart,
        isLoading,
        updateProducts,
        updateCart,
        removeItemFromCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
