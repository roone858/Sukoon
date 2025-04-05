import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { Product } from "../../../../util/types";
import { useReviewContext } from "../../../../context/hooks/useReviewContext";
import { useStoreContext } from "../../../../context/hooks/useStoreContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../../context/hooks/useCartContext";

interface ProductCardProps {
  product: Product;
  mode: "grid" | "list";
}

const ProductCard = ({ product, mode }: ProductCardProps) => {
  const { stats } = useReviewContext();
  const { addToWishlist, removeFromWishlist, wishlist } = useStoreContext();
  const { addToCart } = useCartContext();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();

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

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      quantity: 1,
      name: product.name,
      originalPrice: product.price,
      image: product.images[0]?.url || "",
      discountPercentage: product.discount || 0,
      finalPrice: product.finalPrice || product.price,
      itemTotal: product.finalPrice || product.price * 1,
    });
  };

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
          {product.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full block">
              خصم {product.discount}%
            </span>
          )}
        </div>

        <div className="relative h-48 overflow-hidden">
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
          <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>

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

          <div className="flex items-center mb-3">
            <span className="text-lg font-bold text-purple-700">
              {(product.finalPrice || product.price).toLocaleString()} ر.س
            </span>
            {product.price && (
              <span className="text-gray-400 line-through text-sm mr-2">
                {product.price.toLocaleString()} ر.س
              </span>
            )}
          </div>

          <button
            className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={handleButtonClick}
          >
            <FiShoppingCart size={16} />
            <span>أضف للسلة</span>
          </button>
        </div>
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
          {product.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full block">
              خصم {product.discount}%
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:w-2/3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">
              {product.name}
            </h3>
          </div>

          <div className="text-left">
            <span className="text-xl font-bold text-purple-700 block">
              {(product.finalPrice || product.price).toLocaleString()} ر.س
            </span>
            {product.price && (
              <span className="text-gray-400 line-through text-sm">
                {product.price.toLocaleString()} ر.س
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-600 my-3">
          {product.description ||
            "منتج فاخر من سكون يوفر الراحة والمتانة التي تستحقها"}
        </p>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={handleButtonClick}
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
    </div>
  );
};

export default ProductCard;
