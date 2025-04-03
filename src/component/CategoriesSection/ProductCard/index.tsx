import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../context/hooks/useAuthContext";
import { Product } from "../../../util/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuthContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("يرجى تسجيل الدخول أولاً");
      return;
    }
    toast.success("تمت إضافة المنتج إلى السلة");
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("يرجى تسجيل الدخول أولاً");
      return;
    }
    toast.success("تمت إضافة المنتج إلى المفضلة");
  };

  return (
    <Link to={`/products/${product.id}`} className="block h-full">
      <motion.div
        className="relative h-full bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-semibold z-10">
            {product.discount}% خصم
          </div>
        )}

        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300"
            loading="lazy"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          />

          {/* Action Buttons Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 sm:gap-4 opacity-0 transition-opacity"
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.button
              onClick={handleAddToWishlist}
              className="p-2 sm:p-3 bg-white rounded-full text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Add to wishlist"
            >
              <FaHeart className="text-lg sm:text-xl" />
            </motion.button>
            <motion.button
              onClick={handleAddToCart}
              className="p-2 sm:p-3 bg-white rounded-full text-purple-600 hover:bg-purple-600 hover:text-white transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Add to cart"
            >
              <FaShoppingCart className="text-lg sm:text-xl" />
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <h3 className="text-gray-800 font-semibold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2 min-h-[40px] sm:min-h-[48px]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-1 sm:mb-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  index < 4 ? "text-yellow-400" : "text-gray-300"
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
            <span className="text-purple-600 font-bold text-base sm:text-lg">
              ${product?.finalPrice?.toFixed(2) ?? product.price.toFixed(2)}
            </span>
            {product.finalPrice && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;