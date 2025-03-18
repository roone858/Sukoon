import { useMemo, useState } from "react";
import { products } from "../../db";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [id]
  );
  
  const [mainImage, setMainImage] = useState(product?.image);

  const handleThumbnailClick = (src: string | undefined) => {
    setMainImage(src);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full  md:w-1/2">
            <img
              src={mainImage}
              alt="المنتج"
              className="w-full h-auto rounded-lg shadow-md p-5 bg-white mb-4"
            />
            <div className="flex gap-4 justify-center overflow-x-auto py-4">
              {[product?.image, product?.image, product?.image].map(
                (image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`صورة مصغرة ${index + 1}`}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => handleThumbnailClick(image)}
                  />
                )
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{product?.title}</h2>
            <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
            <div className="mb-6">
              <span className="text-2xl font-bold text-purple-600 mr-2">
                $349.99
              </span>
              <span className="text-gray-500 line-through">$399.99</span>
            </div>

            {/* Ratings */}
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">4.5 (120 تقييم)</span>
            </div>

            {/* Product Description */}
            <p className="text-gray-700 mb-6">{product?.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">اللون:</h3>
              <div className="flex gap-2">
                <button className="size-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"></button>
                <button className="size-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"></button>
                <button className="size-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"></button>
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                الكمية:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                className="w-20 text-center rounded-md border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button className="flex items-center gap-2 bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-900 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                أضف إلى السلة
              </button>
              <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                المفضلة
              </button>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold mb-2">الميزات الرئيسية:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>تقنية إلغاء الضوضاء الرائدة</li>
                <li>بطارية تدوم حتى 30 ساعة</li>
                <li>تحكم باللمس</li>
                <li>تقنية التحدث للتوقف التلقائي</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
