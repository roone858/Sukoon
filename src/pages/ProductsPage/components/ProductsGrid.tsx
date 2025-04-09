// components/Products/ProductsGrid.tsx

import { ReviewProvider } from "../../../context/providers/ReviewProvider";
import { Product } from "../../../types/product.type";
import ProductCard from "../../MegaProductsPage/components/products/ProductCard";

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ReviewProvider key={product.id} productId={product.id}>
          <ProductCard mode="grid" key={product.id} product={product} />
        </ReviewProvider>
      ))}
    </div>
  );
};

export default ProductsGrid;
