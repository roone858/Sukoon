import { ReactNode, useEffect, useState, useCallback } from "react";
import { Order, Product, User } from "../../util/types";
import { StoreContext } from "..";
import productService from "../../services/products.service";
import { productsDb } from "../../db";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import wishlistService from "../../services/wishlist.service";

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
  const addToWishlist = useCallback(
    (productId: string) => {
      if(!user) return toast.info("برجاء تسجيل الدخول اولا!");
      if (wishlist.includes(productId))
        return toast.success("تمت الاضافة بالفعل الى قائمة الرغبات ");

      const newWishlist = [...wishlist, productId];
      (async () => {
        try {
          await wishlistService.addToWishlist(productId);
          toast.success("تمت الاضافة الى قائمة الرغبات ");
        } catch {
          toast.error("حدث خطا");
        }
      })();
      setWishlist(newWishlist);
    },
    [wishlist]
  );
  const removeFromWishlist = useCallback(
    async (id: string) => {
      await wishlistService.removeFromWishlist(id);
      updateWishlist(wishlist.filter((item) => item !== id));
    },
    [wishlist, updateWishlist] // dependencies
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
    if (user) setWishlist(user.wishlist || []);
  }, [user]);

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
        addToWishlist,
        removeFromWishlist,
        updateWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
