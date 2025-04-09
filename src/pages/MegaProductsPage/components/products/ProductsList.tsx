import { ReviewProvider } from "../../../../context/providers/ReviewProvider";
import { Product } from "../../../../types/product.type";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
          <ReviewProvider key={product.id} productId={product.id}>
            <ProductCard product={product} mode="list" />{" "}
          </ReviewProvider>
      ))}
    </div>
  );
};

export default ProductsList;
