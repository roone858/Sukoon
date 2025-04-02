import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { useCartContext } from "../../context/hooks/useCartContext";
import { toast } from "react-toastify";
import { Dimension } from "../AddProduct/components/types";
import ReviewStats from "../../components/ReviewStats";
import { motion } from "framer-motion";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";
import { ReviewProvider } from "../../context/providers/ReviewProvider";
import wishlistService from "../../services/wishlist.service";
// import LoadingPage from "../LoadingPage";

const ProductPage = () => {
  const { products, updateWishlist, wishlist } = useStoreContext();
  const { addToCart } = useCartContext();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const product = useMemo(
    () => products.find((p) => p.id === id),
    [id, products]
  );

  const [mainImage, setMainImage] = useState(product?.images[0]?.url);

  const handleThumbnailClick = (src: string) => {
    setMainImage(src);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      name: product.name,
      originalPrice: getOriginalPrice(),
      quantity: 1,
      finalPrice: calculateFinalPrice(),
      image: product.images?.[0]?.url,
      discountPercentage: product.discount || 0,
      itemTotal: product.finalPrice || product.price,
      dimensionId: selectedDimension?._id,
    });
    toast.success("تمت الإضافة إلى السلة!");
  };

  useEffect(() => {}, [selectedDimension]);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            المنتج غير موجود
          </h2>
          <p className="text-gray-600">
            عذراً، المنتج الذي تبحث عنه غير موجود في المتجر.
          </p>
        </div>
      </div>
    );
  }
  const handleAddToWishlist = async () => {
    try {
      const wishlistRes = await wishlistService.addToWishlist(product.id);
      updateWishlist(wishlistRes ?? [...wishlist, product.id]);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };
  const calculateFinalPrice = () => {
    const basePrice = selectedDimension?.price ?? product.price;
    return product.discount && product.discount > 0
      ? basePrice - (basePrice * product.discount) / 100
      : basePrice;
  };

  const getOriginalPrice = () => {
    return selectedDimension?.price ?? product.price;
  };
  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={mainImage || product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(image.url)}
                  className={`shrink-0 size-16 sm:size-20 rounded-md overflow-hidden border-2 transition-all duration-200 hover:border-purple-400 ${
                    mainImage === image.url
                      ? "border-purple-600 ring-2 ring-purple-200"
                      : "border-transparent"
                  }`}
                  aria-label={`عرض صورة المنتج ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={`صورة مصغرة ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
                {product.name}
              </h1>

              <div className="flex flex-col justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  {/* Final Price (after discount) */}
                  <span className="text-xl sm:text-2xl font-bold text-purple-700">
                    {calculateFinalPrice().toFixed(2)} ر.س
                  </span>

                  {/* Original Price (if discounted) */}
                  {product.discount && product.discount > 0 && (
                    <>
                      <span className="text-gray-500 line-through mr-2 text-sm sm:text-base">
                        {getOriginalPrice().toFixed(2)} ر.س
                      </span>
                      <span className="bg-red-100 text-red-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {product.discount}% خصم
                      </span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>

              {/* Dimensions Selection */}
              {product?.dimensions?.length && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg font-semibold mb-3">
                    المقاسات المتاحة:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.dimensions?.map((dimension, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedDimension(dimension);
                        }}
                        className={`px-4 py-2 rounded-full border transition-all duration-200 hover:border-purple-400 ${
                          selectedDimension?.size.label === dimension.size.label
                            ? "bg-purple-600 text-white border-purple-600 ring-2 ring-purple-200"
                            : "bg-gray-100 text-gray-800 border-gray-300"
                        }`}
                        aria-label={`اختر المقاس ${dimension.size.label}`}
                      >
                        {dimension.size.label}
                        {dimension.price !== product.price && (
                          <span className="text-xs block mt-1">
                            {dimension.price} ر.س
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-6 sm:mb-8">
                <label
                  htmlFor="quantity"
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                >
                  الكمية:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="size-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label="تقليل الكمية"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, Math.min(10, Number(e.target.value)))
                      )
                    }
                    className="w-20 px-3 py-2 text-center rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="size-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label="زيادة الكمية"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  إضافة إلى السلة
                </button>
                <button
                  onClick={() => handleAddToWishlist()}
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  المفضلة
                </button>
              </div>

              {/* Product Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">معلومات المنتج</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-600">ضمان الجودة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-600">شحن سريع</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                    <span className="text-gray-600">إرجاع مجاني</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ReviewProvider productId={id || ""}>
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  التقييمات
                </h2>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  إضافة تقييم
                </button>
              </div>

              {/* Review Stats */}

              {/* Review Form */}
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6"
                >
                  <ReviewForm onCancel={() => setShowReviewForm(false)} />
                </motion.div>
              )}
              <ReviewStats />

              {/* Reviews List */}
              <div className="mt-6">
                <ReviewList />
              </div>
            </div>
          </ReviewProvider>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
