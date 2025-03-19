import { ReactNode, useEffect, useState, useCallback } from "react";

// import { ImageType, PlanType } from "../../types";
// import imagesService from "../../services/images.service";
// import plansService from "../../services/plans.service";
import { Product } from "../../util/types";
import { StoreContext } from "..";
// import axios from "axios";
import { products } from "../../db";

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const res = await axios.get("https://fakestoreapi.com/products");
      // const products = res.data;

      setProducts(products);
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
    <StoreContext.Provider value={{ products, isLoading, updateProducts }}>
      {children}
    </StoreContext.Provider>
  );
};
