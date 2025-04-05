import { ReviewProvider } from "../../../../context/providers/ReviewProvider";
import { Product } from "../../../../util/types";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductsGrid = ({ products, loading = false }: ProductsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-4 animate-pulse"
          >
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
          <ReviewProvider key={product.id} productId={product.id}>
            <ProductCard product={product} mode="grid" />
          </ReviewProvider>
      ))}
    </div>
  );
};

export default ProductsGrid;
