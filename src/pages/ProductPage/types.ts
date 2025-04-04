import { Product } from "../../util/types";

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
