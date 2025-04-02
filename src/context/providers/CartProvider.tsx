import { ReactNode, useEffect, useState, useCallback } from "react";
import { CartItem } from "../../util/types";
import { CartContext } from "..";
import { useAuthContext } from "../hooks/useAuthContext";
import cartService from "../../services/cart.service";

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
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

  const addToCart = useCallback(
    async (newItem: CartItem) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item.productId === newItem.productId
        );

        let updatedCart: CartItem[];
        if (existingItem) {
          // If item exists, update its quantity
          updatedCart = prevCart.map((item) =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          // If item doesn't exist, add it to cart
          updatedCart = [...prevCart, newItem];
        }

        syncCartWithBackend(updatedCart);
        return updatedCart;
      });
    },
    [syncCartWithBackend]
  );

  const updateCartItemQuantity = useCallback(
    async (productId: string, newQuantity: number) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
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
        const updatedCart = prevCart.filter(
          (item) => item.productId !== productId
        );
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
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
