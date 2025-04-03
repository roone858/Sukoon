import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import LoadingSpinner from "../../component/LoadingSpinner";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import QuantitySelector from "./components/QuantitySelector";
import { useProductActions } from "./hooks/useProductActions";
import { MAX_QUANTITY } from "./constants";
import { ReviewProvider } from "../../context/providers/ReviewProvider";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";
import ReviewStats from "../../components/ReviewStats";
import { motion } from "framer-motion";
import { Product } from "../../util/types";

interface ProductInfoWithReviewsProps {
  product: Product;

  onDimensionChange?: (dimensionId: string) => void;
}

// Create a wrapper component to access review context
const ProductInfoWithReviews: React.FC<ProductInfoWithReviewsProps> = ({
  product,

  onDimensionChange,
}) => {
  return (
    <ProductInfo
      product={product}
 
      onDimensionChange={onDimensionChange}
    />
  );
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading } = useStoreContext();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = products.find((p) => p.id === id) || null;
  const {
    selectedQuantity,
    handleQuantityChange,
    handleDimensionChange,
    handleAddToCart,
    handleAddToWishlist,
  } = useProductActions(product);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">المنتج غير موجود</p>
      </div>
    );
  }

  const productStock = product.stock ?? 0;
  const isInStock = productStock > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="    overflow-hidden"
          >
            <ProductImages
              images={product.images.map((img) => img.url)}
              title={product.name}
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 bg-white p-6 rounded-xl shadow-sm"
          >
            <ReviewProvider productId={id}>
              <ProductInfoWithReviews
                product={product}
                onDimensionChange={handleDimensionChange}
              />
            </ReviewProvider>

            {isInStock && (
              <div className="space-y-8">
                <QuantitySelector
                  quantity={selectedQuantity}
                  maxQuantity={Math.min(productStock, MAX_QUANTITY)}
                  onChange={handleQuantityChange}
                />

                <div className="flex flex-col  sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    إضافة إلى السلة
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    إضافة إلى قائمة الرغبات
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewProvider productId={id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">التقييمات</h2>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  إضافة تقييم
                </button>
              </div>

              {/* Review Stats */}
              <ReviewStats />

              {/* Review Form */}
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8"
                >
                  <ReviewForm onCancel={() => setShowReviewForm(false)} />
                </motion.div>
              )}

              {/* Reviews List */}
              <div className="mt-8">
                <ReviewList />
              </div>
            </motion.div>
          </ReviewProvider>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
