// components/Products/ProductsGrid.tsx

import { ReviewProvider } from "../../../context/providers/ReviewProvider";
import { Product } from "../../../types/product.type";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
}

const ProductsGrid = ({ products, viewMode = "grid" }: ProductsGridProps) => {
  return (
    <div className={ viewMode == "grid"? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6":"flex flex-col gap-6"}>
      {products?.map((product) => (
        <ReviewProvider key={product.id} productId={product.id}>
          <ProductCard mode={viewMode} key={product.id} product={product} />
        </ReviewProvider>
      ))}
    </div>
  );
};

export default ProductsGrid;
