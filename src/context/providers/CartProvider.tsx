import { ReactNode, useEffect, useState, useCallback } from "react";
import { CartItem } from "../../util/types";
import { CartContext } from "..";
import { useAuthContext } from "../useContext/useAuthContext";
import cartService from "../../services/cart.service";

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuthContext();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const syncCartWithBackend = useCallback(
    async (updatedCart: CartItem[]) => {
      if (isAuthenticated) {
        try {
          await cartService.update({ items: updatedCart });
        } catch (error) {
          console.error("Error syncing cart with backend:", error);
        }
      }
    },
    [isAuthenticated]
  );

  const updateCart = useCallback(
    async (cartItems: CartItem[]) => {
      setCart(cartItems);
      await syncCartWithBackend(cartItems);
    },
    [syncCartWithBackend]
  );

  const updateCartItemQuantity = useCallback(
    async (productId: string, newQuantity: number) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        );
        syncCartWithBackend(updatedCart); // Sync with the backend
        return updatedCart;
      });
    },
    [syncCartWithBackend]
  );

  const removeItemFromCart = useCallback(
    async (productId: string) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.productId !== productId);
        syncCartWithBackend(updatedCart); // Sync with the backend
        return updatedCart;
      });
    },
    [syncCartWithBackend]
  );

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, authLoading]);

  useEffect(() => {
    const fetchCartData = async () => {
      setIsLoading(true);
      try {
        const response = await cartService.getCart();
        setCart(response?.items || []);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCartData();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart,
        isLoading,
        removeItemFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};