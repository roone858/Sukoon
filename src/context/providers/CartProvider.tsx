import { ReactNode, useEffect, useState, useCallback } from "react";

// import { ImageType, PlanType } from "../../types";
// import imagesService from "../../services/images.service";
// import plansService from "../../services/plans.service";
import { CartItem } from "../../util/types";
import { CartContext } from "..";
// import axios from "axios";

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateCart = useCallback((cartItems: CartItem[]) => {
    setCart(cartItems);
  }, []);

  const updateCartItemQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    },
    []
  );

  const removeItemFromCart = useCallback(
    (id: string) => {
      const updatedCart = cart.filter((item) => item.productId !== id);
      setCart(updatedCart);
    },
    [cart]
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const products = await productService.getAll();
      // setProducts([...products, ...productsDb]);
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
