import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { useCartContext } from "../../context/useContext/useCartContext";
import { toast } from "react-toastify";
import { Dimension } from "../AddProduct/components/types";

const ProductPage = () => {
  const { products } = useStoreContext();
  const { cart, updateCart } = useCartContext();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(
    null
  );

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

    if (product.dimensions?.length && !selectedDimension) {
      toast.error("الرجاء اختيار مقاس");
      return;
    }

    updateCart([
      ...cart,
      {
        productId: product.id,
        name: product.name,
        price: selectedDimension?.price || product.price,
        quantity: quantity,
        image: product.images[0]?.url,
        dimension: selectedDimension|| undefined,
        finalPrice: product.price,
        discount: product.discount || undefined,
      },
    ]);
    toast.success("تمت إضافة المنتج إلى السلة بنجاح");
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        المنتج غير موجود
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <img
                src={mainImage || product.images[0]?.url}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(image.url)}
                  className={`shrink-0 size-16 sm:size-20 rounded-md overflow-hidden border-2 ${
                    mainImage === image.url
                      ? "border-purple-600"
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
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-purple-700">
                    {selectedDimension?.price || product.finalPrice} ر.س
                  </span>
                  {product.discount ? (
                    <span className="text-gray-500 line-through mr-2 text-sm sm:text-base">
                      {selectedDimension?.price || product.price} ر.س
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center">
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="size-5 sm:size-6 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm sm:text-base">
                    4.5 (120 تقييم)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed">
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
                          // Update price display when dimension is selected
                        }}
                        className={`px-4 py-2 rounded-full border ${
                          selectedDimension?.size.label === dimension.size.label
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-gray-100 text-gray-800 border-gray-300"
                        }`}
                        aria-label={`اختر المقاس ${dimension.size.label}`}
                      >
                        {dimension.size.label}
                        {/* {dimension.price !== product.price && (
                          <span className="text-xs block mt-1">
                            {dimension.price} ر.س
                          </span>
                        )} */}
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
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 sm:size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  أضف إلى السلة
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 sm:size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  الميزات الرئيسية:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="size-5 text-purple-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    تقنية إلغاء الضوضاء الرائدة
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="size-5 text-purple-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    بطارية تدوم حتى 30 ساعة
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="size-5 text-purple-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    تحكم باللمس
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="size-5 text-purple-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    تقنية التحدث للتوقف التلقائي
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
