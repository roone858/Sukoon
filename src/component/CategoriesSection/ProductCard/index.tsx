import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useProductActions } from "../../../pages/ProductPage/hooks/useProductActions";
import DimensionOverlay from "./components/DimensionOverlay";
import { Product } from "../../../types/product.type";
function resizeCloudinaryImage(originalUrl: string, width = 400) {
  return originalUrl.replace("/upload/", `/upload/w_${width}/`);
}
interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = "" }: ProductCardProps) => {
  const [showDimensionOverlay, setShowDimensionOverlay] = useState(false);

  // Use the product actions hook
  const {
    selectedDimension,
    handleDimensionChange,
    dimensionError,
    handleAddToWishlist,
    handleAddToCart: addToCartWithDimension,
  } = useProductActions(product);

  const handleAddToCart = (e: React.MouseEvent) => {
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
      <Link
        to={`/products/${product.id}`}
        className={`block h-full ${className}`}
        aria-label={`View ${product.name} details`}
      >
        <div className="relative h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
          {/* Discount Badge */}
          {product.discount && product.discount > 0 ? (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-2 py-1 rounded-full text-xs xs:text-sm font-bold z-10 shadow-md">
              {product.discount}% خصم
            </div>
          ) : null}

          {/* Product Image */}
          <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* Product Image */}
            <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
              <img
                src={
                  resizeCloudinaryImage(product.images?.[0]?.url, 200) ||
                  "https://via.placeholder.com/300x300?text=صورة+غير+متوفرة"
                }
                alt={product.images?.[0]?.altText}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute md:opacity-0 hover:opacity-100 inset-0 md:bg-black/20 md:dark:bg-black/30 flex items-center justify-center gap-2 opacity-100 md:backdrop-blur-sm transition-opacity duration-200">
              <button
                onClick={handleAddToWishlist}
                className="p-3 xs:p-3.5 bg-white cursor-pointer dark:bg-gray-800 rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-colors shadow-lg hover:scale-110 active:scale-90"
                aria-label="Add to wishlist"
              >
                <FaHeart className="text-lg xs:text-xl" />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-3 xs:p-3.5 bg-white cursor-pointer dark:bg-gray-800 rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-colors shadow-lg hover:scale-110 active:scale-90"
                aria-label="Add to cart"
              >
                <FaShoppingCart className="text-lg xs:text-xl" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-3 xs:p-4">
            <h3 className="text-gray-800 dark:text-white font-semibold text-sm xs:text-base mb-1 xs:mb-2 line-clamp-2 min-h-[2.5em]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center mb-1 xs:mb-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-3 h-3 xs:w-4 xs:h-4 ${
                    index < 4
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm xs:text-base">
                {product.finalPrice &&
                typeof product.discount === "number" &&
                product.discount > 0
                  ? product.finalPrice.toFixed(2)
                  : product.price.toFixed(2)}{" "}
                ر.س
              </span>
              {product.finalPrice &&
                typeof product.discount === "number" &&
                product.discount > 0 && (
                  <span className="text-gray-500 dark:text-gray-400 line-through text-xs">
                    {product.price.toFixed(2)} ر.س
                  </span>
                )}
            </div>
          </div>
        </div>
      </Link>
      {/* Dimension Selection Overlay */}
      <DimensionOverlay
        isOpen={showDimensionOverlay}
        product={product}
        selectedDimension={selectedDimension}
        dimensionError={dimensionError}
        onClose={() => setShowDimensionOverlay(false)}
        onDimensionChange={handleDimensionChange}
        onConfirm={handleConfirmAddToCart}
      />
    </>
  );
};

export default ProductCard;
