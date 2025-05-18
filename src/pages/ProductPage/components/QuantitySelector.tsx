import { QuantitySelectorProps } from "../types";
import { motion } from "framer-motion";

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
    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
      <label className="text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
        الكمية:
      </label>

      <div className="flex items-center gap-1">
        <motion.button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          aria-label="تقليل الكمية"
          whileTap={{ scale: 0.9 }}
          className={`p-1.5 xs:p-2 rounded-lg transition-all duration-200 ${
            quantity <= 1
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 xs:w-4 xs:h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>

        <div className="relative w-12 xs:w-16 mx-1">
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
                onChange(value);
              }
            }}
            className="w-full text-center py-1.5 xs:py-2 text-sm xs:text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none"
            min="1"
            max={maxQuantity}
            aria-label="كمية المنتج"
          />
        </div>

        <motion.button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}
          aria-label="زيادة الكمية"
          whileTap={{ scale: 0.9 }}
          className={`p-1.5 xs:p-2 rounded-lg transition-all duration-200 ${
            quantity >= maxQuantity
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 xs:w-4 xs:h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </div>

      <span className="text-xs xs:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        (المتوفر: <span className="font-medium">{maxQuantity}</span>)
      </span>
    </div>
  );
};

export default QuantitySelector;