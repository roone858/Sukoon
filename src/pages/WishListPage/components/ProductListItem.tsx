import { motion } from "framer-motion";
import { IoTrashOutline, IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../util/types";
import { useProductActions } from "../../ProductPage/hooks/useProductActions";
import DimensionOverlay from "../../../component/CategoriesSection/ProductCard/components/DimensionOverlay";
import { toast } from "react-toastify";
import { useState } from "react";

interface ProductListItemProps {
  product: Product;
  removeFromWishlist?: (productId: string) => void;
}

const ProductListItem = ({
  product,
  removeFromWishlist,
}: ProductListItemProps) => {
  const navigate = useNavigate();

  const [showDimensionOverlay, setShowDimensionOverlay] = useState(false);

  const {
    handleAddToCart: addToCartWithDimension,
    selectedDimension,
    handleDimensionChange,
    dimensionError,
  } = useProductActions(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // If product has dimensions, show overlay instead of adding directly
    if (product.dimensions?.length) {
      setShowDimensionOverlay(true);
      return;
    }
    addToCartWithDimension();
  };

  const handleConfirmAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedDimension && product?.dimensions?.length) {
      toast.error("الرجاء اختيار مقاس");
      return;
    }

    addToCartWithDimension();
    setShowDimensionOverlay(false);
    toast.success("تمت إضافة المنتج إلى السلة");
  };
  return (
    <>
      <motion.li
        key={product.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-row gap-4 p-4 border border-gray-100 dark:border-gray-700"
      >
        {/* Product Image - Right Side (small) */}
        <div className="relative group flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
          <img
            src={product.images[0]?.url || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          />

          {/* Remove button */}
          {removeFromWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromWishlist(product.id);
              }}
              className="absolute top-1 left-1 p-1.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
            >
              <IoTrashOutline className="w-4 h-4 text-red-500 dark:text-red-400" />
            </button>
          )}

          {/* Discount badge */}
          {product.discount && product.discount && (
            <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-md">
              {product.discount}%
            </div>
          )}
        </div>

        {/* Product Info - Left Side */}
        <div className="flex-1 flex flex-col text-right">
          <div className="flex-1">
            <h3
              className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.name}
            </h3>

            {/* Rating (optional) */}
            <div className="flex justify-end mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < 4
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Price */}
            <div className="flex justify-between items-center gap-2 mb-2">
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {product.discount && product.discount
                  ? (product.price * (1 - product.discount / 100)).toFixed(2)
                  : product.price}{" "}
                ر.س
              </span>
              {product.discount && product.discount && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  {product.price} ر.س
                </span>
              )}
            </div>

            {/* Dimensions (if available) */}
            {product.dimensions && product.dimensions?.length > 0 && (
              <div className="mb-2 flex justify-between items-center">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                  المقاسات المتاحة:
                </p>
                <div className="flex flex-wrap justify-end gap-1">
                  {product.dimensions.slice(0, 3).map((dim) => (
                    <span
                      key={dim._id}
                      className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-md"
                    >
                      {dim.size.label}
                    </span>
                  ))}
                  {product.dimensions.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-md">
                      +{product.dimensions.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="flex justify-end">
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors text-sm sm:text-base"
            >
              <IoCartOutline className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>أضف للسلة</span>
            </button>
          </div>
        </div>
      </motion.li>
      {showDimensionOverlay && (
        <DimensionOverlay
          product={product}
          selectedDimension={selectedDimension}
          dimensionError={dimensionError}
          onClose={() => setShowDimensionOverlay(false)}
          onDimensionChange={handleDimensionChange}
          onConfirm={handleConfirmAddToCart}
        />
      )}
    </>
  );
};

export default ProductListItem;
