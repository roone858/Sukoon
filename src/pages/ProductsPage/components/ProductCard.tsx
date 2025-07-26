import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiShare2,
  FiShoppingBag,
} from "react-icons/fi";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Product } from "../../../types/product.type";
import { useReviewContext } from "../../../context/hooks/useReviewContext";
import { useStoreContext } from "../../../context/hooks/useStoreContext";
import { useProductActions } from "../../ProductPage/hooks/useProductActions";
import DimensionOverlay from "../../../component/CategoriesSection/ProductCard/components/DimensionOverlay";

interface ProductCardProps {
  product: Product;
  mode: "grid" | "list" | "category";
}

const ProductCard = ({ product, mode }: ProductCardProps) => {
  const { stats } = useReviewContext();
  const { addToWishlist, removeFromWishlist, wishlist } = useStoreContext();
  const [isInWishlist, setIsInWishlist] = useState(false);
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
  // Check if product is in wishlist when component mounts or wishlist changes
  useEffect(() => {
    setIsInWishlist(wishlist.some((id) => id === product.id));
  }, [wishlist, product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  if (mode === "category") {
    return (
      <div
        onClick={handleCardClick}
        key={product.id}
        className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group relative border border-gray-100 hover:border-purple-100"
      >
        {/* Product Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
          {/* {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                      جديد
                    </span>
                  )} */}
          {product.discount && (
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
              خصم {product.discount}%
            </span>
          )}
        </div>

        {/* Share Button */}
        <button
          className="absolute top-2 right-2 z-10 bg-white/90 text-gray-700 p-1.5 rounded-full hover:bg-white hover:text-purple-600 transition-colors shadow-sm hover:shadow-md"
          aria-label="مشاركة المنتج"
        >
          <FiShare2 className="text-sm" />
        </button>

        {/* Product Image */}
        <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
          <img
            src={
              product.images[0]?.url ||
              "https://via.placeholder.com/300x300?text=صورة+غير+متوفرة"
            }
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="p-3">
          <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 mb-1 h-12 flex items-center">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center mt-1">
            <span className="text-purple-600 font-bold text-sm md:text-base">
              $
              {(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-gray-400 text-xs line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <div className="flex items-center text-yellow-400 mr-1">
              <FiStar className="fill-current" />
              {/* <span className="ml-1 text-gray-700">
                        {product.rating}
                      </span> */}
            </div>
            {/* <span>({product.reviews || 0})</span> */}
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors flex items-center justify-center active:scale-95 transform transition-transform"
            aria-label={`أضف ${product.name} إلى السلة`}
            onClick={handleAddToCart}
          >
            <FiShoppingBag className="mr-2" />
            أضف للسلة
          </button>
        </div>
          <DimensionOverlay
        isOpen={showDimensionOverlay}
        product={product}
        selectedDimension={selectedDimension}
        onDimensionChange={handleDimensionChange}
        dimensionError={dimensionError}
        onClose={() => setShowDimensionOverlay(false)}
        onConfirm={handleConfirmAddToCart}
      />
      </div>
    );
  }

  if (mode === "grid") {
    return (
      <div
        className="relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="absolute top-3 right-3 z-5 space-y-1">
          {new Date(product.createdAt) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full block">
              جديد
            </span>
          )}
          {product.discount && product.discount > 0 ? (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full block">
              خصم {product.discount}%
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="relative h-48 overflow-hidden  truncate">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={toggleWishlist}
            className={`absolute bottom-3 left-3 p-2 rounded-full shadow-md transition-colors ${
              isInWishlist
                ? "bg-red-100 text-red-500 hover:bg-red-200"
                : "bg-white/90 hover:bg-white text-gray-700"
            }`}
          >
            <FiHeart className={isInWishlist ? "fill-current" : ""} size={18} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-1  truncate">
            {product.name}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex text-amber-400 mr-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(stats.average) ? "fill-current" : ""
                  }
                />
              ))}
            </div>
            <span className="text-gray-500 text-xs">
              {"("}
              {stats.total}
              {")"}
            </span>
          </div>

          <div className="flex flex-col xxs:flex-row items-center mb-3">
            <span className="text-lg font-bold text-purple-700">
              {(product.finalPrice || product.price).toLocaleString()} ر.س
            </span>
            {product.discount && product.discount > 0 ? (
              <span className="text-gray-400 line-through text-sm mr-2">
                {product.price.toLocaleString()} ر.س
              </span>
            ) : null}
          </div>

          <button
            className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <FiShoppingCart size={16} />
            <span>أضف للسلة</span>
          </button>
        </div>
        <DimensionOverlay
          isOpen={showDimensionOverlay}
          product={product}
          selectedDimension={selectedDimension}
          onDimensionChange={handleDimensionChange}
          dimensionError={dimensionError}
          onClose={() => setShowDimensionOverlay(false)}
          onConfirm={handleConfirmAddToCart}
        />
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="sm:w-1/3 relative">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-48 sm:h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 space-y-1">
          {new Date(product.createdAt) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full block">
              جديد
            </span>
          )}
          {product.discount && product.discount > 0 ? (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full block">
              خصم {product.discount}%
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-4 sm:w-2/3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1   ">
              {product.name}
            </h3>
          </div>

          <div className="text-left">
            <span className="text-xl font-bold text-purple-700 block">
              {(product.finalPrice || product.price).toLocaleString()} ر.س
            </span>
            {product.discount && product.discount > 0 ? (
              <span className="text-gray-400 line-through text-sm">
                {product.price.toLocaleString()} ر.س
              </span>
            ) : null}
          </div>
        </div>

        <p className="text-gray-600 my-3 truncate">
          {product.description ||
            "منتج فاخر من سكون يوفر الراحة والمتانة التي تستحقها"}
        </p>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <FiShoppingCart size={16} />
            <span>أضف للسلة</span>
          </button>
          <button
            onClick={toggleWishlist}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              isInWishlist
                ? "bg-red-100 text-red-500 hover:bg-red-200"
                : "border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FiHeart className={isInWishlist ? "fill-current" : ""} size={18} />
          </button>
        </div>
      </div>

      <DimensionOverlay
        isOpen={showDimensionOverlay}
        product={product}
        selectedDimension={selectedDimension}
        onDimensionChange={handleDimensionChange}
        dimensionError={dimensionError}
        onClose={() => setShowDimensionOverlay(false)}
        onConfirm={handleConfirmAddToCart}
      />
    </div>
  );
};

export default ProductCard;
