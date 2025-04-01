import { Link } from "react-router-dom";
import { CartItem, Product } from "../../util/types";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/useContext/useCartContext";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image with aspect ratio */}
      <Link
        to={`/products/${product.id}`}
        className="block relative pt-[100%] overflow-hidden bg-gray-50 dark:bg-gray-900"
        aria-label={`View ${product.name}`}
      >
        {/* Loading Skeleton */}
        {isImageLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
        )}
        
        <img
          className={`absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          src={product.images && product.images[0].url}
          alt={product.name}
          loading="lazy"
          width={100}
          height={100}
          onLoad={() => setIsImageLoading(false)}
        />

        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            {product.discount}% خصم
          </div>
        )}

        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <span className="text-white text-sm font-medium">عرض التفاصيل</span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Title */}
        <Link
          to={`/products/${product.id}`}
          className="flex-grow mb-2 group/title"
          aria-label={`View ${product.name} details`}
        >
          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover/title:text-purple-600 dark:group-hover/title:text-purple-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Product Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {product.finalPrice || product.price} ر.س
            </span>
            {product.discount && product.discount > 0 && (
              <span className="text-xs text-gray-500 line-through">
                {product.price} ر.س
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <AddButton product={product} />
      </div>
    </div>
  );
};

const AddButton = ({ product }: { product: Product }) => {
  const { cart, updateCart } = useCartContext();

  const handleAddToCart = () => {
    const foundIndex = cart.findIndex((item) => item.productId === product.id);
    let updatedCart;

    if (foundIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[foundIndex] = {
        ...updatedCart[foundIndex],
        quantity: updatedCart[foundIndex].quantity + 1,
      };
      toast.info("تم تحديث الكمية في السلة!");
    } else {
      const newCartItem: CartItem = {
        productId: product.id,
        name: product.name,
        originalPrice: product.price,
        quantity: 1,
        finalPrice: product.finalPrice || product.price,
        image: product.images && product.images[0].url,
        discountPercentage: product.discount || 0,
        itemTotal: product.finalPrice || product.price,
      };
      updatedCart = [...cart, newCartItem];
      toast.success("تمت الإضافة إلى السلة!");
    }

    updateCart(updatedCart);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full text-xs sm:text-sm flex items-center justify-center gap-2 px-3 py-2 font-medium text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 dark:border-purple-600 dark:text-purple-600 dark:hover:bg-purple-600 dark:hover:text-white group/button"
      aria-label={`Add ${product.name} to cart`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 group-hover/button:scale-110 transition-transform duration-200"
      >
        <path d="M21 15H11C8.17157 15 6.75736 15 5.87868 14.1213C5 13.2426 5 11.8284 5 9V5C5 3.89543 4.10457 3 3 3M10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5ZM18 19.5C18 20.3284 17.3284 21 16.5 21C15.6716 21 15 20.3284 15 19.5C15 18.6716 15.6716 18 16.5 18C17.3284 18 18 18.6716 18 19.5ZM12.5 11H16.5C17.9045 11 18.6067 11 19.1111 10.6629C19.3295 10.517 19.517 10.3295 19.6629 10.1111C20 9.60669 20 8.90446 20 7.5C20 6.09554 20 5.39331 19.6629 4.88886C19.517 4.67048 19.3295 4.48298 19.1111 4.33706C18.6067 4 17.9045 4 16.5 4H12.5C11.0955 4 10.3933 4 9.88886 4.33706C9.67048 4.48298 9.48298 4.67048 9.33706 4.88886C9 5.39331 9 6.09554 9 7.5C9 8.90446 9 9.60669 9.33706 10.1111C9.48298 10.3295 9.67048 10.517 9.88886 10.6629C10.3933 11 11.0955 11 12.5 11Z" />
      </svg>
      <span className="hidden sm:block">إضافة إلى السلة</span>
    </button>
  );
};

export default ProductCard;
