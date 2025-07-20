import { useEffect, useState } from "react";
import { useCartContext } from "../../../context/hooks/useCartContext";
import { MAX_QUANTITY } from "../constants";
import { Dimension } from "../../AddProduct/components/types";

import { useStoreContext } from "../../../context/hooks/useStoreContext";
import { useAuthContext } from "../../../context/hooks/useAuthContext";
import { toast } from "react-toastify";
import { Product } from "../../../types/product.type";

export const useProductActions = (product: Product | null) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(
    null
  );

  const [dimensionError, setDimensionError] = useState<null | string>("");

  const { addToCart } = useCartContext();
  const { addToWishlist } = useStoreContext();
  const { user } = useAuthContext();

  // // Initialize selected dimension if product has dimensions
  // useEffect(() => {
  //   if (product?.dimensions && product.dimensions.length > 0) {
  //     setSelectedDimension(null);
  //   } else {
  //     setSelectedDimension(null);
  //   }
  // }, [product]);

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(Math.min(quantity, MAX_QUANTITY));
  };

  const handleDimensionChange = (dimensionId: string) => {
    if (!product) return;
    const dimension =
      product.dimensions?.find((dim) => dim._id === dimensionId) || null;
    setSelectedDimension(dimension);
    setDimensionError(null);
  };

  const validateDimensionSelection = () => {
    if (product?.dimensions?.length && !selectedDimension) {
      setDimensionError("الرجاء اختيار المقاس");
      return false;
    }
    return true;
  };
  const handleAddToCart = () => {
    if (!product) return;
    if (!validateDimensionSelection()) {
      return;
    }
    // Calculate the final price based on discount and selected dimension
    const discountPercentage = product.discount || 0;
    const basePrice = selectedDimension
      ? selectedDimension.price
      : product.price;
    const finalPriceValue = basePrice - (basePrice * discountPercentage) / 100;
    addToCart({
      productId: product.id,
      quantity: selectedQuantity,
      dimensionId: selectedDimension?._id,
      name: product.name,
      originalPrice: basePrice,
      image: product.images[0]?.url || "",
      discountPercentage,
      finalPrice: finalPriceValue,
      itemTotal: finalPriceValue * selectedQuantity,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("يرجى تسجيل الدخول أولاً");
      return;
    }
    if (!product) return;
    addToWishlist(product.id);
  };

  useEffect(() => {
    if (!product) return;
    // Skip calculation if there's a dimension error
    const discountPercentage = product.discount || 0;
    const basePrice = selectedDimension
      ? selectedDimension.price
      : product.price;
    const finalPriceValue = basePrice - (basePrice * discountPercentage) / 100;
    setFinalPrice(finalPriceValue);
  }, [product, selectedDimension]);

  return {
    finalPrice,
    selectedQuantity,
    selectedDimension,
    dimensionError,
    handleQuantityChange,
    handleDimensionChange,
    handleAddToCart,
    handleAddToWishlist,
  };
};
