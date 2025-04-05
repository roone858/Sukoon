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

const ProductInfoWithReviews: React.FC<ProductInfoWithReviewsProps> = ({
  product,
  onDimensionChange,
}) => {
  return (
    <ProductInfo product={product} onDimensionChange={onDimensionChange} />
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
        <p className="text-lg xs:text-xl text-gray-600 dark:text-gray-400">
          المنتج غير موجود
        </p>
      </div>
    );
  }

  const productStock = product.stock ?? 0;
  const isInStock = productStock > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 xs:py-8 sm:py-12">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
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
            className="space-y-6 xs:space-y-8 bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-sm"
          >
            <ReviewProvider productId={id}>
              <ProductInfoWithReviews
                product={product}
                onDimensionChange={handleDimensionChange}
              />
            </ReviewProvider>

            {isInStock && (
              <div className="space-y-6 xs:space-y-8">
                <QuantitySelector
                  quantity={selectedQuantity}
                  maxQuantity={Math.min(productStock, MAX_QUANTITY)}
                  onChange={handleQuantityChange}
                />

                <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-purple-600 dark:bg-purple-700 text-white px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg font-medium hover:bg-purple-700 dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    إضافة إلى السلة
                  </motion.button>
                  <motion.button
                    onClick={handleAddToWishlist}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    إضافة إلى المفضلة
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 xs:mt-16">
          <ReviewProvider productId={id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex  items-start sm:items-center justify-between gap-4 mb-6 xs:mb-8">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white">
                  التقييمات
                </h2>
                <motion.button
                  onClick={() => setShowReviewForm(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 xs:px-5 py-2 xs:py-2.5 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  إضافة تقييم
                </motion.button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 xs:mt-8"
                >
                  <ReviewForm onCancel={() => setShowReviewForm(false)} />
                </motion.div>
              )}
              {/* Review Stats */}
              <ReviewStats />

              {/* Reviews List */}
              <div className="mt-6 xs:mt-8">
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
