import { Product } from "../../types/product.type";
import { Dimension } from "../AddProduct/components/types";

export interface ProductPageProps {
  product: Product;
  isLoading: boolean;
}

export interface ProductDetailsProps {
  product: Product;
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

export interface ProductImagesProps {
  images: string[];
  title: string;
}

export interface ProductInfoProps {
  product: Product;

  selectedDimension: Dimension | null;
  dimensionError: string | null;
  finalPrice: number;

  onDimensionChange?: (dimensionId: string) => void;
}

export interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onChange: (quantity: number) => void;
}

export interface ProductActionsProps {
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  isInStock: boolean;
}

export interface ReviewFormProps {
  productId: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export interface ReviewListProps {
  productId: string;
}

export interface ReviewStatsProps {
  productId: string;
}

export interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}
