import { QuantitySelectorProps } from "../types";

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  maxQuantity,
  onChange,
}) => {
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        الكمية:
      </label>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          aria-label="تقليل الكمية"
          className={`p-2 rounded-lg transition-all duration-200 ${
            quantity <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-700 border border-gray-200 hover:border-primary-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="relative w-16 mx-1">
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
                onChange(value);
              }
            }}
            className="w-full text-center py-2 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none"
            min="1"
            max={maxQuantity}
            aria-label="كمية المنتج"
          />
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}
          aria-label="زيادة الكمية"
          className={`p-2 rounded-lg transition-all duration-200 ${
            quantity >= maxQuantity
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-700 border border-gray-200 hover:border-primary-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <span className="text-sm text-gray-500 whitespace-nowrap">
        (المتوفر: <span className="font-medium">{maxQuantity}</span>)
      </span>
    </div>
  );
};

export default QuantitySelector;
