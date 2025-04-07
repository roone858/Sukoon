import { FiStar } from "react-icons/fi";
import { ProductInfoProps } from "../types";
import { useReviewContext } from "../../../context/hooks/useReviewContext";

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedDimension,
  onDimensionChange,
  dimensionError,
  finalPrice,
}) => {

  const { stats } = useReviewContext();
  const dimensions = product.dimensions || [];
  const inStock = product.stock;



  return (
    <div className="space-y-4">
      <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900">
        {product.name}
      </h1>
      {/* Price and Discount */}
      <div className="flex items-start xs:items-center flex-wrap gap-2 sm:gap-4">
        <p className="text-lg xs:text-xl sm:text-2xl font-semibold text-purple-600">
          {finalPrice.toLocaleString("ar-SA")} ر.س
        </p>
        {product?.discount && product?.discount > 0 && (
          <>
            <span className="text-gray-500 text-sm line-through">
              {selectedDimension
                ? selectedDimension.price.toLocaleString("ar-SA")
                : product?.price.toLocaleString("ar-SA")}{" "}
              ر.س
            </span>
            <span className="bg-red-100 text-red-700 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded-full">
              {product?.discount}% خصم
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {inStock ? "متوفر" : "غير متوفر"}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(stats.average)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">({stats.total} تقييم)</span>
      </div>

      {/* Dimensions Selection - Now as a dropdown */}
      {dimensions.length > 0 && (
        <div className="space-y-2">
          <label
            htmlFor="dimension-select"
            className="text-xs md:text-sm mb-1 block"
          >
            اختر المقاس
          </label>
          <select
            id="dimension-select"
            value={selectedDimension?._id || ""}
            onChange={(e) => onDimensionChange?.(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
          >
            <option value="">-- اختر المقاس --</option>
            {dimensions.map((dimension) => (
              <option key={dimension._id} value={dimension._id}>
                {dimension.size.label}
                {dimension.price !== 0 &&
                  ` (${
                    dimension.price > 0 ? "" : ""
                  }${dimension.price.toLocaleString("ar-SA")} ر.س)`}
              </option>
            ))}
          </select>
        </div>
      )}
      {dimensionError && (
        <p className="text-red-500 text-xs mt-1">{dimensionError}</p>
      )}
      {/* Description */}
      <div className="prose prose-sm max-w-none text-sm sm:text-lg text-gray-600">
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
