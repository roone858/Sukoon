import { useEffect, useState } from "react";
import { useCartContext } from "../../../context/hooks/useCartContext";
import { Product } from "../../../util/types";
import { MAX_QUANTITY } from "../constants";
import { Dimension } from "../../AddProduct/components/types";

import { useStoreContext } from "../../../context/hooks/useStoreContext";

export const useProductActions = (product: Product | null) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(
    null
  );
  const { addToCart } = useCartContext();
  const { addToWishlist } = useStoreContext();

  // Initialize selected dimension if product has dimensions
  //   useEffect(() => {
  //     if (product?.dimensions && product.dimensions.length > 0) {
  //       setSelectedDimension(product.dimensions[0]);
  //     }
  //   }, [product]);

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(Math.min(quantity, MAX_QUANTITY));
  };

  const handleDimensionChange = (dimensionId: string) => {
    if (!product) return;

    const dimension =
      product.dimensions?.find((dim) => dim._id === dimensionId) || null;
    setSelectedDimension(dimension);
  };

  const handleAddToCart = () => {
    if (!product) return;

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

  const handleAddToWishlist = () => {
    if (!product) return;

    addToWishlist(product.id);
  };


  useEffect(() => {
    if (!product) return;

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
    handleQuantityChange,
    handleDimensionChange,
    handleAddToCart,
    handleAddToWishlist,
  };
};
