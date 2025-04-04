import { FiStar } from "react-icons/fi";
import { ProductInfoProps } from "../types";
import { useProductActions } from "../hooks/useProductActions";
import { useReviewContext } from "../../../context/hooks/useReviewContext";

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,

  onDimensionChange,
}) => {
  const { selectedDimension, handleDimensionChange, finalPrice } =
    useProductActions(product);
  const {  stats } = useReviewContext();
  const dimensions = product.dimensions || [];
  const inStock = product.stock;

  const handleDimensionSelect = (dimensionId: string) => {
    handleDimensionChange(dimensionId);
    if (onDimensionChange) {
      onDimensionChange(dimensionId);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xlxs:text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
      {/* Price and Discount */}
      <div className="flex items-start xs:items-center flex-wrap  gap-2 sm:gap-4">
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
            <span className="bg-red-100 text-red-700 text-xs  sm:text-sm font-medium px-2.5 py-0.5 rounded-full">
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

      {/* Dimensions Selection */}
      {dimensions.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs md:text-sm mb-1">اختر المقاس</h3>
          <div className="flex flex-wrap gap-2">
            {dimensions.map((dimension) => (
              <button
                key={dimension._id}
                onClick={() => handleDimensionSelect(dimension?._id)}
                className={`px-4 py-2 border cursor-pointer rounded-lg  text-xs md:text-sm font-medium transition-all duration-200 ${
                  selectedDimension?._id === dimension._id
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50"
                }`}
              >
                {dimension.size.label}
                {/* {dimension.price !== 0 && (
                  <span
                    className={`mr-1 text-xs ${
                      dimension.price > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {dimension.price > 0 ? "+" : ""}
                    {dimension.price.toLocaleString("ar-SA")} ر.س
                  </span>
                )} */}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="prose prose-sm max-w-none  text-sm sm:text-lg text-gray-600">
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
